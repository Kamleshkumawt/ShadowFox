import orderModel from '../../models/order.model.js';
import cartModel from "../../models/carts.model.js";
import productModel from '../../models/products.model.js';

export const createOrder = async (req, res) => {
    try {
        const { total_amount, shipping_address, payment_method, items,paymentId } = req.body;
        console.log('req.body',req.body)

        const userId = req.user._id;
        const newOrder = new orderModel({ userId, total_amount, shipping_address, payment_method, items, paymentId });
        await newOrder.save();
        await cartModel.findOneAndDelete({ userId });
        // console.log('cart after order', cart);
        res.status(201).json({ success: true, message: 'Order created successfully', newOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

export const getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await orderModel.find({ userId }).populate('userId').populate('items.productId');
        res.status(200).json({ success: true, message: 'Orders fetched successfully', orders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

//get order By sellerID 
// export const getOrdersBySellerId = async (req, res) => {
//     try {
//         const sellerId = req.user._id;
//         console.log('sellerId', sellerId);
//         const orders = await orderModel.findById({ sellerId });
//         console.log('orders',orders);
//         res.status(200).json({ success: true, message: 'Orders fetched successfully', orders });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Server error', error: error.message });
//     }
// }

//get order By product ID 

export const getOrdersBySellerId = async (req, res) => {
    try {
        const productId = req.params.id;
        const orders = await orderModel.find({ items: { $elemMatch: { productId } } }).populate('userId').populate('items.productId');
        res.status(200).json({ success: true, message: 'Orders fetched successfully', orders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}


//update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

    for (const item of updatedOrder.items) {
      if (item.productId?._id) {
        await productModel.findByIdAndUpdate(
          item.productId._id,
          { orderStatus: status }, 
          { new: true }
        );
      }
    }


        res.status(200).json({ success: true, message: 'Order status updated successfully', updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}