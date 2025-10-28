import sellerModel from "../../models/sellers.model.js";
import userModel from "../../models/user.model.js";
import categoryModel from "../../models/categories.model.js";
import slugify from "slugify";
import productModel from "../../models/products.model.js";
import orderModel from "../../models/order.model.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name, description, parentId } = req.body;

    const slug = slugify(name, { lower: true });

    if (!name) {
      return res
        .status(400)
        .json({ error: "Name and description are required" });
    }

    const existingCategory = await categoryModel.findOne({ slug });

    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }

    const category = await categoryModel.create({
      name,
      slug,
      description,
      parentId: parentId || null,
    });

    // if (parentId) {
    //     const parentCategory = await categoryModel.findById(parentId);
    //     console.log('parentCategory',parentCategory);
    //     if (!parentCategory) {
    //         return res.status(400).json({ error: 'Parent category not found' });
    //     }
    //     parentCategory.children.push(category._id);
    //     await parentCategory.save();
    // }

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get all categories bY null Id
export const getAllAdminCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({ parentId: null }); //.populate('parentId', 'name slug')
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: err.message,
    });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, parentId } = req.body;
    const slug = slugify(name, { lower: true });

    const updated = await categoryModel.findByIdAndUpdate(
      id,
      { name, description, parentId: parentId || null, slug },
      { new: true }
    );

    res.status(200).json({ message: "Category updated", category: updated });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Update failed", error: err.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

export const getAllSeller = async (req, res) => {
    try {
        const sellers = await sellerModel.find();
        res.status(200).json({ success: true, message: "All sellers fetched successfully", sellers });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({ success: true, message: "All users fetched successfully", users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json({ success: true, message: "All products fetched successfully", products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find();
        res.status(200).json({ success: true, message: "All orders fetched successfully", orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

export const updateOrderStatusByAdmin = async (req, res) => {
  try {

    const { status, orderId } = req.body;

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      updatedOrder,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const getOrdersById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const orders = await orderModel
      .findById(orderId);

    res
      .status(200)
      .json({ success: true, message: "Orders fetched successfully", orders });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};


export const deleteProductByAdmin = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findByIdAndDelete(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", errors: error.message });
  }
};

export const blockUserByAdmin = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.isDisabled = !user.isDisabled;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User update successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", errors: error.message });
  }
};

export const blockSellerByAdmin = async (req, res) => {
  try {
    const sellerId = req.params.id;
    const seller = await sellerModel.findById(sellerId);
    if (!seller) {
      return res
        .status(404)
        .json({ success: false, message: "Seller not found" });
    }
    seller.isDisabled = !seller.isDisabled;
    await seller.save();
    res
      .status(200)
      .json({ success: true, message: "Seller update successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", errors: error.message });
  }
};

export const updateUserProfileByAdmin = async (req, res) => {
  try {
    const { username, email, phone,userId } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Update fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
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

export const getUserByIdAdmin = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User fetched successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", errors: error.message });
  }
};

export const updateUserPasswordByAdmin = async (req, res) => {
  try {
    const { oldPassword, newPassword, userId } = req.body;

    const user = await userModel.findById(userId).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isMatch = await user.isValidPassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedPassword = await userModel.hashPassword(newPassword);
    if (!hashedPassword) {
      return res.status(500).json({ message: "Error hashing password" });
    }
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
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

export const updateSellerByAdmin = async (req, res) => {
  try {
    const {
      store_name,
      store_description,
      store_address,
      gst_number,
      bank_details,
      policies,
      mangerName,
      sellerId,
    } = req.body;

    // console.log('req body', req.body)

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

    const updatedFields = {};
    if (store_name) updatedFields.store_name = store_name;
    if (store_description) updatedFields.store_description = store_description;
    if (store_address) updatedFields.store_address = store_address;
    if (gst_number) updatedFields.gst_number = gst_number;
    if (bank_details) updatedFields.bank_details = bank_details;
    if (policies) updatedFields.policies = policies;
    if (mangerName) updatedFields.mangerName = mangerName;

    // console.log("updatedFields before cleanup:", updatedFields);

   
    Object.keys(updatedFields).forEach((key) => {
      const value = updatedFields[key];

      if (value === undefined) delete updatedFields[key];
      else if (typeof value === "object" && Object.keys(value).length === 0) {
        delete updatedFields[key];
      }
      else if (typeof value === "string" && value.trim() === "") {
        delete updatedFields[key];
      }
    });

    // console.log("updatedFields after cleanup:", updatedFields);

    const seller = await sellerModel.findOneAndUpdate(
      { sellerId },
      updatedFields,
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

export const getSellerByIdAdmin = async (req, res) => {
  try {
    const sellerId = req.params.id;
    const seller = await sellerModel.findById(sellerId);
    if (!seller) {
      return res
        .status(404)
        .json({ success: false, message: "Seller not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Seller fetched successfully", seller });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", errors: error.message });
  }
};

export const updateSellerPassByAdmin = async (req, res) => {
  try {
    const { oldPassword, newPassword, sellerId } = req.body;

    const seller = await sellerModel.findById(sellerId).select("+password");
    if (!seller) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isMatch = await seller.isValidPassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedPassword = await sellerModel.hashPassword(newPassword);
    if (!hashedPassword) {
      return res.status(500).json({ message: "Error hashing password" });
    }
    seller.password = hashedPassword;

    await seller.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
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