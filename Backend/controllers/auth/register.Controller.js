import userModel from '../../models/user.model.js';
import { asyncHandler } from '../../middleware/errorHandler.js';

export const registerController = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone, password, date_of_birth } = req.body;

    if(!firstName || !lastName  || !password || !date_of_birth) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // Validate phone format
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
        return res.status(400).json({ message: 'Please provide a valid 10-digit phone number' });
    }

    // Validate password length
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if email or phone already exists
    const existingEmailUser = await userModel.findOne({ email });
    const existingPhoneUser = await userModel.findOne({ phone });

    if (existingEmailUser && existingPhoneUser) {
        return res.status(400).json({ message: 'User with this email and phone already exists' });
    }

    if (existingEmailUser) {
        return res.status(400).json({ message: 'Email already in use' });
    }

    if (existingPhoneUser) {
        return res.status(400).json({ message: 'Phone number already in use' });
    }

    const hashedPassword = await userModel.hashPassword(password);
    if(!hashedPassword) {
        return res.status(500).json({ message: 'Error hashing password' });
    }
    
    const username = firstName == lastName ? firstName : (firstName + lastName).toLowerCase() + Math.floor(Math.random() * 1000);

    const user = new userModel({ firstName, lastName, username , email, phone, password:hashedPassword, date_of_birth });
    await user.save();

    delete user._doc.password; // Remove password from response

    const token = user.generateJWT();
    if(!token) {
        return res.status(500).json({ message: 'Error generating token' });
    }

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
    });

    res.status(201).json({ success: true, message: 'User registered successfully', user, token });
});