import { asyncHandler } from '../../middleware/errorHandler.js';
import userModel from '../../models/user.model.js';
import sellerModel from '../../models/sellers.model.js';

export const loginController = asyncHandler(async (req, res) => {
    const { email, phone, password } = req.body;

    if(!password || (!email && !phone)) {
        return res.status(400).json({
            success: false,
            message: 'Email or phone and password are required'
        });
    }

    const phoneRegex = /^[0-9]{10}$/;
    if(phone && !phoneRegex.test(phone)) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid 10-digit phone number'
        });
    }

    if(password.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters long'
        });
    }
    

    const user = await userModel.findOne({ $or: [{ email }, { phone }] }).select('+password');
    if(!user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }

    if(user.isDisabled) {
        return res.status(403).json({
            success: false,
            message: 'Your account has been disabled. Please contact support.'
        });
    }

    const isMatch = await user.isValidPassword(password);
    if(!isMatch) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }

    const token =  user.generateJWT();

    delete user._doc.password;

    await userModel.findByIdAndUpdate(user._id, { lastActive: Date.now() });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
    });

    if(user.role === 'seller'){
        const seller = await sellerModel.findOne({userId: user._id});
        if(!seller) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            seller,
            token
        });
    }

    res.status(200).json({
        success: true,
        message: 'Login successful',
        user,
        token
    });
});