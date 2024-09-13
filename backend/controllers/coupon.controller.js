import Coupon from "../Models/coupon.model.js";

export const getMyCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ user: req.user._id, isActive: true });
        if (!coupon) {
            return res.status(404).json({ message: "No personal coupon found", coupon: null });
        }
        res.status(200).json({ message: "user coupon found", coupon });

    } catch (error) {
        console.log("error in getCoupon controller", error);
        res.status(500).json({ message: "Internal server error" });

    }
};

export const validateCoupon = async (req, res) => {
    try {
        const { couponCode } = req.body;
        const coupon = (await Coupon.findOne({ user: req.user._id, code: couponCode, isActive: true, }) || await Coupon.findOne({ user: null, code: couponCode, isActive: true, }));

        if (!coupon) {
            return res.status(404).json({ message: "Invalid Coupon code" });
        }
        if (coupon.expiry < new Date()) {
            coupon.isActive = false;
            await coupon.save();
            return res.status(404).json({ message: "Coupon Expired" });
        }
        res.status(200).json({ message: `${couponCode} Applied`, coupon });

    } catch (error) {
        console.log("error in validateCoupon controller", error);
        res.status(500).json({ message: "Internal server error" });

    }
}

export const getCoupon = async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== "admin") {
            return res.status(401).json({ message: "Not authorized" });
        }
        const coupons = await Coupon.find({ isActive: true });
        if (!coupons) {
            return res.status(404).json({ message: "No coupon found", coupon: null });
        }
        res.status(200).json({ message: "All Active Coupons Fetched", coupons });

    } catch (error) {
        console.log("error in getCoupon controller", error);
        res.status(500).json({ message: "Internal server error" });

    }
 }

export const createCoupon = async (req, res) => {
    try {
        const couponData = req.body;
        console.log(couponData);
        const coupon = new Coupon({ 
            code: couponData.code,
            category: couponData.category,
            discountPercentage: couponData.discountPercentage, 
            expiry: couponData.expiry, 
            isActive: true, 
         });
        await coupon.save();
        res.status(201).json({ message: `Coupon ${coupon.code} Created`, coupon });

    } catch (error) {
        console.log("error in createCoupon controller", error);
        res.status(500).json({ message: "Internal server error" });

    }
 }

export const deleteCoupon = async (req, res) => {
    try {
        const { couponId } = req.params;
        console.log(couponId);
        const coupon = await Coupon.findOneAndDelete({ _id: couponId });
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }
        res.status(200).json({ message: `Coupon ${coupon.code} Deleted` });
        
    } catch (error) {
        console.log("error in deleteCoupon controller", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
 }