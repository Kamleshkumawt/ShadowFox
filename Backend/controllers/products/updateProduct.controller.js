import productModel from '../../models/products.model.js';
import categoryModel from '../../models/categories.model.js';
import  uploadOnCloudinary  from '../../db/cloudinary.js';
import { asyncHandler } from '../../middleware/errorHandler.js';

export const updateProduct = asyncHandler(async (req, res) => {
    const { name, description, quantity, color, tags, weight, dimensions } = req.body;
    const productId = req.params.id;
    const sellerId = req.user.id; 

    // if (!name || !price || !description || !category || !quantity || !color || !brand  || !weight || !dimensions || !status) {
    //     res.status(400);
    //     throw new Error('Please provide all required fields');
    // }

    const product = await productModel.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    if (product.sellerId.toString() !== sellerId) {
        res.status(403);
        throw new Error('You are not authorized to update this product');
    }
    let images = product.images;

    if (req.files && req.files.length > 0) {
        console.log('📸 Uploading images to Cloudinary:', req.files.length);
        const uploadPromises = req.files.map((file) => uploadOnCloudinary(file.path));
        const cloudinaryResults = await Promise.all(uploadPromises);

        cloudinaryResults.forEach((result, index) => {
            if (result.success) {
                images.push({
                    url: result.secure_url,
                    publicId: result.public_id,
                    width: result.width,
                    height: result.height,
                    format: result.format,
                    bytes: result.bytes,
                });
                console.log('✅ Image uploaded:', {
                    index,
                    url: result.secure_url,
                    size: `${Math.round(result.bytes / 1024)}KB`,
                    format: result.format,
                });
            } else {
                console.error('❌ Cloudinary upload failed for file:', index, result.error);
            }
        });
    }

    console.log('images',images);

   if(name) product.name = name;
   if(description) product.description = description;
   if(quantity) product.quantity = quantity;
   if(color) product.color = color;
   if(tags) product.tags = tags;
   if(weight) product.weight = weight;
   if(dimensions) product.dimensions = dimensions;

    const updatedProduct = await product.save();
    res.status(200).json({ success: true, message: 'Product updated successfully', product: updatedProduct });
});

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', errors: error.message });
    }
}