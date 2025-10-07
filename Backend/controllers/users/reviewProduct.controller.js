import uploadOnCloudinary from '../../db/cloudinary.js';
import reviewModel from '../../models/reviews.model.js';

export const reviewsController = async (req, res) => {
    try {
        const { productId, rating,  comment } = req.body;
        const userId = req.user._id;
        const images = [];
        
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

        const newReview = new reviewModel({ userId, productId, rating, images, comment });
        await newReview.save();
        res.status(201).json({ success: true, message: 'Review submitted successfully', newReview });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

export const getReviewsByProductId = async (req, res) => {
    try {
        const productId = req.params.id;
        const reviews = await reviewModel.find({ productId }).populate('userId', 'name');
        res.status(200).json({ success: true, message: 'Reviews fetched successfully', reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

