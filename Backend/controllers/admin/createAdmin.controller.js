import uploadOnCloudinary from "../../db/cloudinary.js";
import adminModel from "../../models/admin.model.js";

export const createAdmin = async (req, res) => {
  try {
    const { phone, password,username } = req.body;

    const existingAdmin = await adminModel.findOne();
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    if (!phone || !password) {
      return res
        .status(400)
        .json({ message: "Phone number and password are required" });
    }

    const hashedPassword = await adminModel.hashPassword(password);
    if (!hashedPassword) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    const admin = await adminModel.create({ phone,username, password: hashedPassword });

    const token = admin.generateJWT();
    if (!token) {
      return res.status(500).json({ message: "Error generating token" });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    });

    delete admin._doc.password; // Remove password from response
    res
      .status(200)
      .json({ success: true, message: "Admin created successfully", admin, token });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res
        .status(400)
        .json({ message: "Phone number and password are required" });
    }

    const admin = await adminModel.findOne({ phone }).select("+password");
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await admin.isValidPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = admin.generateJWT();
    if (!token) {
      return res.status(500).json({ message: "Error generating token" });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    });

    delete admin._doc.password;

    res
      .status(200)
      .json({ success: true, message: "Login successful", admin, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      errors: error.message,
    });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const adminId = req.user?._id;
    const admin = await adminModel.findById({_id:adminId});
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = admin.generateJWT();
    if (!token) {
      return res.status(500).json({ message: "Error generating token" });
    }

    delete admin._doc.password;

    res.status(200).json({ success: true, message: "Admin found", admin, token });

  } catch (error) {
    res
    .status(500)
    .json({ success: false, message: "Server error", error: error.message });
  }
}

export const logoutAdmin = async (req, res) => {
  try {
    const adminId = req.user?._id;

    const admin = await adminModel.findById(adminId);
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    admin.lastActive = Date.now();
    await admin.save();

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error during logout",
        errors: error.message,
      });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { username } = req.body;

    const adminId = req.user?._id;

    const admin = await adminModel.findById({_id:adminId});
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const profileImage = {};

    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path);
      // console.log('📸 Uploading profileImage to Cloudinary :', result);
      if (result.success) {
        profileImage.url = result.secure_url;
        profileImage.publicId = result.public_id;
        profileImage.width = result.width;
        profileImage.height = result.height;
        profileImage.format = result.format;
        profileImage.bytes = result.bytes;

        // console.log("✅ Image uploaded:", {
        //   url: result.secure_url,
        //   size: `${Math.round(result.bytes / 1024)}KB`,
        //   format: result.format,
        // });
      } else {
        console.error(`❌ Failed to upload image`, result.error);
      }
    }

    if (profileImage) admin.profile_picture = profileImage;
    if (username) admin.username = username;
    await admin.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      admin,
    });

  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating profile",
      errors: error.message,
    });
  }
};

export const updateAdminPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const adminId = req.user?._id;

    const admin = await adminModel.findById(adminId).select("+password");
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isMatch = await admin.isValidPassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedPassword = await adminModel.hashPassword(newPassword);
    if (!hashedPassword) {
      return res.status(500).json({ message: "Error hashing password" });
    }
    admin.password = hashedPassword;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      admin,
    });
  } catch (error) {
    console.error("Update password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating password",
      errors: error.message,
    });
  }
};


