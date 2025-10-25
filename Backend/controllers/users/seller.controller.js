import uploadOnCloudinary from "../../db/cloudinary.js";
import sellerModel from "../../models/sellers.model.js";
import userModel from "../../models/user.model.js";
import { asyncHandler } from "../../middleware/errorHandler.js";

export const createSeller = asyncHandler(async (req, res) => {
  const { store_phone, password } = req.body;
  const userId = req.user._id;

  if (!store_phone || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // if(!req.file.path){
  //     return res.status(400).json({ error: 'Store image is required' });
  // }
  const existingSeller = await sellerModel.findOne({ store_phone });
  if (existingSeller) {
    return res.status(400).json({ error: "You are already a seller" });
  }

  const hashedPassword = await sellerModel.hashPassword(password);

  if (!hashedPassword) {
    return res.status(500).json({ error: "Error in password hashing" });
  }

  const seller = await sellerModel.create({
    userId,
    store_phone,
    password: hashedPassword,
  });

  await userModel.findByIdAndUpdate(userId, { role: "seller" });
  res
    .status(201)
    .json({ success: true, message: "Seller created successfully", seller });
});

export const sellerLoginController = asyncHandler(async (req, res) => {
  const { store_phone, password } = req.body;

  if (!password || !store_phone) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (store_phone && !phoneRegex.test(store_phone)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid 10-digit phone number",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long",
    });
  }

  const seller = await sellerModel.findOne({ store_phone }).select("+password");
  if (!seller) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  if (seller.isDisabled) {
    return res.status(403).json({
      success: false,
      message: "Your account has been disabled. Please contact support.",
    });
  }

  const isMatch = await seller.isValidPassword(password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  await seller.findByIdAndUpdate(seller._id, { lastActive: Date.now() });

  const token = seller.generateJWT();

  delete seller._doc.password;

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 50 * 24 * 60 * 60 * 1000, // 50 days
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    seller,
    token,
  });
});

export const getSellerByUserId = async (req, res) => {
  try {
    const userId = req.user._id;
    const seller = await sellerModel.findOne({ userId });
    res
      .status(200)
      .json({ success: true, message: "Seller fetched successfully", seller });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const updateSeller = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const {
      store_name,
      store_description,
      store_address,
      gst_number,
      bank_details,
      policies,
      mangerName
    } = req.body;

    if (
      !store_name &&
      !store_description &&
      !store_address &&
      !gst_number &&
      !bank_details &&
      !policies
    ) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    const store_image = {};

    // console.log('req file',req.file)
    // console.log('req file',req.file.path)

    if (req.file && req.file.path) {
      try {
        const result = await uploadOnCloudinary(req.file.path);
        console.log('result : ',result)
        if (result.success) {
          store_image.url = result.secure_url;
          store_image.publicId = result.public_id;
          store_image.width = result.width;
          store_image.height = result.height;
          store_image.format = result.format;
          store_image.bytes = result.bytes;
        } else {
          return res
            .status(400)
            .json({ error: "Failed to upload store image" });
        }
      } catch (error) {
        return res.status(400).json({ error: "Failed to upload store image" });
      }
    }

    // console.log('store:',store_image)

    const seller = await sellerModel.findOneAndUpdate(
      { userId },
      {
        store_name,
        store_description,
        store_address,
        gst_number,
        bank_details,
        policies,
        store_image,
        mangerName
      },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Seller updated successfully", seller });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
