import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
    },
    price: {
        type: Number,
        min: 0,
        required: [true, 'Please add a price'],
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        // required: [true, 'Please add an imag/e'],
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
    },
    countInStock: {
        type: Number,
        required: [true, 'Please add a stock count'],
        min: 0,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },


}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;