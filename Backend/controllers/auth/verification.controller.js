import crypto from 'crypto';
import User from '../../models/user.model.js';

// email se pata karna ki ussi email ka user hai ya nahi link send karke

export const verifyAccount = async (req, res) => {
  const { email, token } = req.body;
  if (!email || !token) return res.status(400).json({ success: false, message: 'Email and token required' });

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    email,
    verificationToken: hashedToken,
    verificationTokenExpires: { $gt: Date.now() } // not expired
  });

  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid or expired token' });
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;
  await user.save();

  return res.json({ success: true, message: 'Account verified successfully' });
};
