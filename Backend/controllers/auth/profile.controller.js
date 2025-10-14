import userModel from '../../models/user.model.js';

export const profileController = async (req, res) => {
    try {
        const userId = req.user?._id;
        
        const user = await userModel.findById(userId).select('-password');

        if(!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        res.status(200).json({success: true, message: 'Profile fetched successfully', user });
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching profile',
            errors: error.message
        });
    }
};

//not work currently
export const updateProfileController = async (req, res) => {
    try {
        const {username, email, phone } = req.body;
        
        const userId = req.user?._id;
        
        const user = await userModel.findById(userId);
        if(!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const profileImage = '';

          if (req.file && req.file.profileImage.length > 0) {
            // console.log('📸 Uploading images to Cloudinary:', req.files.images.length);
        
             const result = await uploadOnCloudinary(req.file.path);
              if (result.success) {
                profileImage.push({
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

        // Update fields
        // if(address) user.address = address;
        if(profileImage) user.profile_picture = profileImage;
        if(username) user.username = username;
        // if(date_of_birth) user.date_of_birth = date_of_birth;
        if(email) user.email = email;
        if(phone) user.phone = phone;
        // if(firstName) user.firstName = firstName;
        // if(lastName) user.lastName = lastName;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user
        });

    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating profile',
            errors: error.message
        });
    }
}

export const updateProfilePasswordController = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        
        const userId = req.user?._id;
        
        const user = await userModel.findById(userId).select('+password');
        if(!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const isMatch = await user.isValidPassword(oldPassword);
        if(!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        const hashedPassword = await userModel.hashPassword(newPassword);
        if(!hashedPassword) {
            return res.status(500).json({ message: 'Error hashing password' });
        }
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });

    } catch (error) {
        console.error('Update password error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating password',
            errors: error.message
        });
    }
}