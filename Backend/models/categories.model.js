import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        default: null
    }
}, { timestamps: true });

const Category = mongoose.model('category', categorySchema);

export default Category;