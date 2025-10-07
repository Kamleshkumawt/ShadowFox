import productModel from '../../models/products.model.js';
import categoryModel from '../../models/categories.model.js';
import  uploadOnCloudinary  from '../../db/cloudinary.js';
import { asyncHandler } from '../../middleware/errorHandler.js';

export const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, category, quantity, color, brand,discount,tags, weight,dimensions,status } = req.body;
    const productId = req.params.id;
    const sellerId = req.user.id; 

    // if (!name || !price || !description || !category || !quantity || !color || !brand  || !weight || !dimensions || !status) {
    //     res.status(400);
    //     throw new Error('Please provide all required fields');
    // }

    // if (name.length < 3 || name.length > 100) {
    //     res.status(400);
    //     throw new Error('Name must be between 3 and 100 characters');
    // }

    // if (description.length < 10 || description.length > 1000) {
    //     res.status(400);
    //     throw new Error('Description must be between 10 and 1000 characters');
    // }

    // if (price <= 0) {
    //     res.status(400);
    //     throw new Error('Price must be a positive number');
    // }

    // if (quantity <= 0) {
    //     res.status(400);
    //     throw new Error('Quantity must be a positive number');
    // }

    const validCategories = await categoryModel.find().distinct('name');
    if (!validCategories.includes(category)) {
        res.status(400);
        throw new Error(`Category must be one of the following: ${validCategories.join(', ')}`);
    }

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

   if(name) product.name = name;
   if(price) product.price = price;
   if(description) product.description = description;
   if(category) product.categoryId = await categoryModel.findOne({ name: category }).then(cat => cat ? cat._id : null);
   if(quantity) product.quantity = quantity;
   if(color) product.color = color;
   if(brand) product.brand = brand;
   if(discount) product.discount = discount;
   if(tags) product.tags = tags;
   if(weight) product.weight = weight;
   if(dimensions) product.dimensions = dimensions;
   if(status) product.status = status;
   if(images) product.images = images;

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