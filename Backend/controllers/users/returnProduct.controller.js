import returnModel from '../../models/returns.model.js';

export const returnsController = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
              success: false,
              message: "Missing request body",
            });
        }
        const { orderId, productId, sellerId, reason, refundAmount, status } = req.body;
        const userId = req.user._id;

        const newReturn = new returnModel({ orderId, productId,sellerId, userId, reason, refundAmount, status  });
        await newReturn.save();
        res.status(201).json({ success: true, message: 'Return request created successfully', newReturn });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

export const getAllReturnsBySellerId = async (req, res) => {
    try {
        const sellerId = req.user._id;
        
        const returns = await returnModel.find({ sellerId }).populate('productId');
        res.status(200).json({ success: true, message: 'Returns fetched successfully', returns });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

//get all returns for admin
export const getAllReturns = async (req, res) => {
    try {
        const returns = await returnModel.find().populate('userId', 'name').populate('orderId');
        res.status(200).json({ success: true, message: 'Returns fetched successfully', returns });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}