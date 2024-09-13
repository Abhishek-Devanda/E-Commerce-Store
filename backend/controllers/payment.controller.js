import Coupon from "../Models/coupon.model.js";
import Order from "../Models/order.model.js";
import stripe from "../lib/stripe.js";
import dotenv from "dotenv";

dotenv.config();


export const createCheckoutSession = async (req, res) => {
    try {
        const { products, couponCode } = req.body;
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "Please add some products to your cart." });
        }

        let totalAmount = 0;

        const lineItems = products.map(product => {
            const amount = Math.round(product.price * 100); // converting to cents
            totalAmount += (amount * product.quantity)

            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: amount,
                },
                quantity: product.quantity,
            }

        })

        let coupon = null;
        if (couponCode) {
            coupon = await Coupon.findOne({ code: couponCode, isActive: true });
            if (!coupon) {
                return res.status(400).json({ message: "Invalid coupon code." });
            }
            totalAmount -= totalAmount * coupon.discountPercentage / 100;
        }


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
            discounts: coupon ? [{
                coupon: await createStripeCoupon(coupon.discountPercentage),
            }] : [],
            metadata: {
                userId: req.user._id.toString(),
                coupon: coupon ? coupon.code : null,
                products: JSON.stringify({
                    products: products.map(product => ({
                        productId: product._id,
                        quantity: product.quantity,
                        price: product.price,
                    })),
                }),
            },

        })

        const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
        res.status(200).json({ message: "Checking Out...", stripePublishableKey, id: session.id, totalAmount: totalAmount / 100 });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkoutSuccess = async (req, res) => {
    try {
        const { session_id } = req.body;
        try {
            const session = await stripe.checkout.sessions.retrieve(session_id);
            if (session.payment_status === "paid") {
                // Disable the Coupon in the database if it was applied
                if (session.metadata.coupon) {
                    await Coupon.findOneAndUpdate({user: session.metadata.userId, code: session.metadata.coupon },
                        { isActive: false });
                }
                // Create a new coupon if the total amount is greater than 2000
                const totalAmount = session.amount_total;
                if (totalAmount/100 >= 2000) {
                    await createCoupon(req.user._id);
                }
                // create order in the database
                const checkoutProducts = JSON.parse(session.metadata.products).products;

                const newOrder = new Order({
                    user: session.metadata.userId,
                    products: checkoutProducts.map(product => ({
                        product: product.productId,
                        quantity: product.quantity,
                        price: product.price,
                    })),

                    totalAmount: session.amount_total / 100,
                    stripeSessionId: session_id,
                });

                const isOrderExist = await Order.findOne({ stripeSessionId: session_id });
                if (!isOrderExist) {
                    await newOrder.save();
                }

                return res.status(200).json({ message: "Order placed successfully", orderId: newOrder._id });
            }
        } catch (error) {
            return res.status(400).json({ message: "No such checkout session,", orderId: "No order Found" });
        }

    } catch (error) {
        console.log('Error in checkoutSuccess controller', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function createStripeCoupon(discountPercentage) {
    const coupon = await stripe.coupons.create({
        percent_off: discountPercentage,
        duration: "once",
    })
    return coupon.id;
}

async function createCoupon(userId) {
    await Coupon.deleteOne({user:userId});

    const newCoupon = new Coupon({
        category: "PURCHASE DISCOUNT",
        user: userId,
        code: 'GIFT' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        discountPercentage: 20,
        expiry: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    });
    await newCoupon.save();
    return newCoupon;
}