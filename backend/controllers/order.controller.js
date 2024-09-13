import Order from "../Models/order.model.js";

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('products.product');
        res.status(200).json({ orders });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('products.product');
        res.status(200).json({ orders });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const changeStatus = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { status } = req.body
        const order = await Order.findById(orderId);
        order.status = status;
        await order.save();
        res.status(200).json({ message: `Order is ${status} ` });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        await Order.findByIdAndDelete(orderId);
        res.status(200).json({ message: `Order Deleted` });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getOrderDetails = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId).populate('products.product').populate('user', 'name email');
        res.status(200).json({ order });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
        
    }
 }