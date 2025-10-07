import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    images: [{
        type: String,
        default: []
    }],
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Review = mongoose.model('review', reviewSchema);

export default Review;