import { request } from "express";
import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, "coupon code is required"],
    },
    category: {
        type: String,
        request: [true, "coupon category required"]
    },
    expiry: {
        type: Date,
        required: [true, "coupon expiry is required"],
    },
    discountPercentage: {
        type: Number,
        required: [true, "discount is required"],
        min: 0,
        max: [100, "discount cannot be more than 100%"],
    },
    
    isActive: {
        type: Boolean,
        default: true,
    },
        
    user: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    
}, { timestamps: true });


const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;