import mongoose from "mongoose";
import categoryModel from "../../models/categories.model.js";

// Get all categories bY null Id
export const getCategories = async (req, res) => {
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

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find(); //.populate('parentId', 'name slug')
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

//Get all categories by parent id
export const getCategoriesByParentId = async (req, res) => {
  try {
    const parentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(parentId)) {
      return res.status(400).json({ message: "Invalid category parent ID" });
    }

    const categories = await categoryModel.find({ parentId }); //.populate('parentId', 'name slug')
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

export const getCategoriesById = async (req, res) => {
  try {
    const _id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const categories = await categoryModel.findById({ _id }); //.populate('parentId', 'name slug')
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

// Get category by slug
export const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const searchTerm = slug?.trim();

    if (!searchTerm) {
      return res
        .status(400)
        .json({ success: false, message: "Query required" });
    }

    const category = await categoryModel
      .findOne({
        slug: { $regex: searchTerm, $options: "i" }, // i = case-insensitive
      })
      .populate("parentId", "name slug");


    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      category,
    });
    
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: err.message,
    });
  }
};


