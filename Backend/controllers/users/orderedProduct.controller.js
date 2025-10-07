import orderModel from '../../models/order.model.js';

export const createOrder = async (req, res) => {
    try {
        const { total_amount, shipping_address, payment_method, items,paymentId } = req.body;
        const userId = req.user._id;
        const newOrder = new orderModel({ userId, total_amount, shipping_address, payment_method, items,paymentId });
        await newOrder.save();
        res.status(201).json({ success: true, message: 'Order created successfully', newOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

export const getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await orderModel.find({ userId });
        res.status(200).json({ success: true, message: 'Orders fetched successfully', orders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

//get order By product ID 
export const getOrdersBySellerId = async (req, res) => {
    try {
        const productId = req.params.id;
        const orders = await orderModel.find({ items: { $elemMatch: { productId } } });
        res.status(200).json({ success: true, message: 'Orders fetched successfully', orders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}