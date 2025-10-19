import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: { type: String, unique: true },
    description: {
        type: String,
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        default: null
    },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

categorySchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});


const Category = mongoose.model('category', categorySchema);

export default Category;