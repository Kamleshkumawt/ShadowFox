import productModel from '../../models/products.model.js';
import categoryModel from '../../models/categories.model.js';
import {asyncHandler} from '../../middleware/errorHandler.js';
import  uploadOnCloudinary  from '../../db/cloudinary.js';
import sellerModel from '../../models/sellers.model.js';

export const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, category, quantity, color, brand, discount, tags, weight,dimensions,size,material,battery,age,hsnCode,styleCode,comboType} = req.body;
    const sellerId = req.user._id; 
    // const sellerId = "68e2a5264f4c2c3d92fbdca3"; 

    // console.log('req.body data',req.body);
    // console.log('req.files data',req.files);
    // console.log('req.files data length',req.files.images.length);

    if (!name || !price || !description || !category || !quantity || !color || !brand  || !weight || !dimensions  || !size || !material || !battery || !age || !hsnCode || !comboType) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    if (description.length < 10 || description.length > 1000) {
        res.status(400);
        throw new Error('Description must be between 10 and 1000 characters');
    }
    if (price <= 0) {
        res.status(400);
        throw new Error('Price must be a positive number');
    }

    if (quantity <= 0) {
        res.status(400);
        throw new Error('Quantity must be a positive number');
    }

    // const validCategories = await categoryModel.find().distinct('name');
    // if (!validCategories.includes(category)) {
    //     res.status(400);
    //     throw new Error(`Category must be one of the following: ${validCategories.join(', ')}`);
    // }

    const store = await sellerModel.findOne({userId:sellerId});
    if (!store) {
        res.status(400);
        throw new Error(`Seller not found`);
    }

    if((store.store_name).trim() !== brand.trim()) {
      res.status(400);
      throw new Error('brand not found please Enter correct brand name')
    }
   
    

    const images = [];
    const frontImage = {};

    if (req.files && req.files.frontImage) {
      // console.log('📸 Uploading frontImage to Cloudinary :', req.files.frontImage[0]);
      const result = await uploadOnCloudinary(req.files.frontImage[0].path);
      // console.log('frontImage result from cloudinary :',result);
      if (result.success) {
        frontImage.url = result.secure_url;
        frontImage.publicId = result.public_id;
        frontImage.width = result.width;
        frontImage.height = result.height;
        frontImage.format = result.format;
        frontImage.bytes = result.bytes;
      } else {
        return res.status(500).json({
          success: false,
          message: 'Image upload failed',
        });
      }
    }

    if(frontImage.length === 0) {
     return res.status(500).json({
      success: false,
      message: 'frontImage upload failed',
    });
    }

  if (req.files && req.files.images.length > 0) {
    // console.log('📸 Uploading images to Cloudinary:', req.files.images.length);

    const uploadPromises = req.files.images.map((file) => uploadOnCloudinary(file.path));
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

        // console.log('✅ Image uploaded:', {
        //   index,
        //   url: result.secure_url,
        //   size: `${Math.round(result.bytes / 1024)}KB`,
        //   format: result.format,
        // });
      } else {
        console.error(`❌ Failed to upload image #${index + 1}`, result.error);
      }
    });
  } else {
    return res.status(400).json({
      success: false,
      message: 'No files received',
    });
  }

  if (images.length === 0) {
    return res.status(500).json({
      success: false,
      message: 'Image upload failed',
    });
  }

  const existingProduct = await productModel.findOne({
      name: name,
      images: { $all: images, $size: images.length } // images का sequence और length match करना
    });

    
    if (existingProduct) {
        res.status(400);
        throw new Error('Product with this name already exists');
    }

    const product = await productModel.create({
        sellerId,
        name,
        description,
        price,
        color,
        brand,
        categoryId: await categoryModel.findOne({ name: category }).then(cat => cat ? cat._id : null),
        discount: discount || { percentage: 0 },
        quantity,
        tags: Array.isArray(tags) ? tags.map(tag => tag.trim()).filter(tag => tag.length > 0) : typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0): [],
        frontImage,
        images,
        weight,
        size,
        age,
        material,
        battery,
        hsnCode,
        styleCode,
        dimensions: {
            width: dimensions.width,
            height: dimensions.height,
            depth: dimensions.depth,
        },
        comboType,
    });

    res.status(201).json({ success: true, message: 'Product created successfully', product });
});

