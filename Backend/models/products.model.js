import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    brand:{
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true,
    },
    discount: {
       percentage: { type: Number, default: 0 },
       valid_until: { type: Date }
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    tags: [{ type: String }],
    images: [{
    url: {
      type: String,
      required: true
    },
    publicId: String,
    width: Number,
    height: Number,
    format: String,
    bytes: Number,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
    weight: {
        type: Number,
        required: true,
    },
    dimensions: {
        width: { type: String, required: true },
        height: { type: String, required: true },
        depth: { type: String, required: true },
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'out of stock'],
        default: 'active'
    },
    reviews_count: { type: Number, default: 0 },
    rating: { type: Number, default: 0 }
}, { timestamps: true });

const Product = mongoose.model('product', productSchema);

export default Product;