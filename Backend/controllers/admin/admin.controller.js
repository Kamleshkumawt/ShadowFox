import sellerModel from "../../models/sellers.model.js";
import userModel from "../../models/user.model.js";
import categoryModel from "../../models/categories.model.js";
import slugify from "slugify";

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