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
    size: {
        type: String,
        required: true
    },
    tags: [{ type: String }],
    frontImage: {
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
    },
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
        enum: ['Active', 'Inactive', 'Out of stock'],
        default: 'Active'
    },
    comboType: {
        type: String,
        default: 'single'
    },
    manufacturerAddr: {
        name: {
            type: String,
        },
        street: {
            type: String,
        },
        postalCode: {
            type: String,
        },
    },
    packerAddr: {
        name: {
            type: String,
        },
        street: {
            type: String,
        },
        postalCode: {
            type: String,
        },
    },
    hsnCode: {
        type: String,
        required: true
    },
    styleCode: {
        type: String,
    },
    material: {
        type: String,
        required: true
    },
    battery: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    isWishlist: { type: Boolean, default: false },
    reviews_count: { type: Number, default: 0 },
    rating: { type: Number, default: 0 }
}, { timestamps: true });

productSchema.index({ sellerId: 1 });

const Product = mongoose.model('product', productSchema);

export default Product;