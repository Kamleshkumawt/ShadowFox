import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payment_method: {
        type: String,
        enum: ['cash_on_delivery', 'online_payment', 'upi', 'wallet', 'net_banking', 'card'],
        default: 'cash_on_delivery'
    },
    payment_status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    payment_date: {
        type: Date,
        default: Date.now
    },
    transactionId: {
        type: String,
        unique: true,
        sparse: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    paid_at: {
        type: Date
    }
}, { timestamps: true });

const Payment = mongoose.model('payment', paymentSchema);

export default Payment;