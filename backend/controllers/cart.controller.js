import Product from "../Models/product.model.js";

export const getCartProducts = async (req, res) => {
    try {
        const user = req.user;
        const products = await Product.find({ _id: { $in: user.cartItems } });

        const cart = products.map(product => {
            const { name, price, category, image, description } = product;

            const quantity = user.cartItems.find(item => item._id.toString() === product._id.toString()).quantity;
            return { name, price, category, image, description, quantity, _id: product._id };
        })

        res.status(200).json({ cart });


    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });

    }
}

export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        const existingProduct = user.cartItems.find((item) => item._id.toString() === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            user.cartItems.push({ _id: productId });
        }
        await user.save();
        const product = await Product.findById(productId);
        res.status(201).json({ message: `${product.name} is Added to the Cart`, cartItems: user.cartItems });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export const emptyCart = async (req, res) => {
    try {
        const user = req.user;

        user.cartItems = [];
        await user.save();
        res.status(200).json({ message: 'Cart is Empty', cart: user.cartItems });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Error is empty cart controller", error: error.message });
    }
}

export const updateQunatity = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const user = req.user;

        const existingProduct = user.cartItems.find(item => item._id.toString() === id);
        const product = await Product.findById(id);
        if (existingProduct) {

            if (quantity === 0) {
                user.cartItems = user.cartItems.filter(item => item._id.toString() !== id);
                await user.save();
                return res.status(200).json({ message: `${product.name} is removed from Cart`, cartItems: user.cartItems });

            } else if (quantity < 0) {
                return res.status(400).json({ message: 'Product not found in cart' });
            }
            existingProduct.quantity = quantity;
            await user.save();
            res.status(200).json({ message: `${product.name} quantity updated`, cartItems: user.cartItems });


        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server Error", error: error.message });

    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { id: productId } = req.params;
        const user = req.user;

        if (productId) {
            user.cartItems = user.cartItems.filter(item => item._id.toString() !== productId);
        }
        await user.save();
        const product = await Product.findById(productId);
        return res.status(200).json({ message: `${product.name} is removed from Cart`, cartItems: user.cartItems });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error in removing product", error: error.message });

    }
}