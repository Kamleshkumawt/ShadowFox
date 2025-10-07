import userModel from "../../models/user.model.js";

export const logoutController = async (req, res) => {
   try {
     const userId = req.user?._id;
    
    const user = await userModel.findById(userId);
    if(!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    user.lastActive = Date.now();
    await user.save();

    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    res.status(200).json({success: true, message: 'Logout successful' });

   } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({success: false, message: 'Server error during logout', errors: error.message });
   }
};