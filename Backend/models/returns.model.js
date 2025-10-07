import mongoose from "mongoose";

const returnSchema = new mongoose.Schema({
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        required: true
    },
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller',
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    reason:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'approved', 'rejected', 'completed'],
        default: 'pending'
    },
    refundAmount:{
        type: Number,
        required: true
    },
    requestedAt:{
        type: Date,
        default: Date.now
    },
    processedAt:{
        type: Date
    }
}, { timestamps: true });

const Return = mongoose.model('return', returnSchema);

export default Return;