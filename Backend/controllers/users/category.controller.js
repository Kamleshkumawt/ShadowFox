import mongoose from 'mongoose';
import categoryModel from '../../models/categories.model.js';
import slugify from 'slugify';

export const createCategoryController = async (req, res) => {
    try {
        const { name, description, parentId } = req.body;

        const slug = slugify(name, { lower: true });

        if (!name ) {
            return res.status(400).json({ error: 'Name and description are required' });
        }

        const existingCategory = await categoryModel.findOne({ slug });

        if (existingCategory) {
            return res.status(400).json({ error: 'Category already exists' });
        }

        const category = await categoryModel.create({
            name,
            slug,
            description,
            parentId: parentId || null
        })

        // if (parentId) {
        //     const parentCategory = await categoryModel.findById(parentId);
        //     console.log('parentCategory',parentCategory);
        //     if (!parentCategory) {
        //         return res.status(400).json({ error: 'Parent category not found' });
        //     }
        //     parentCategory.children.push(category._id);
        //     await parentCategory.save();
        // }

        res.status(201).json({ success: true, message: 'Category created successfully', category });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({ parentId: null }); //.populate('parentId', 'name slug')
     res.status(200).json({ success: true, message: 'Categories fetched successfully', categories });
  } catch (err) {
    res.status(500).json({success: false, message: "Error fetching categories", error: err.message });
  }
};

//Get all categories by parent id
export const getCategoriesByParentId = async (req, res) => {
  try {
    const parentId = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(parentId)) {
      return res.status(400).json({ message: 'Invalid category parent ID' });
    }

    const categories = await categoryModel.find({ parentId }); //.populate('parentId', 'name slug')
     res.status(200).json({ success: true, message: 'Categories fetched successfully', categories });
  } catch (err) {
    res.status(500).json({success: false, message: "Error fetching categories", error: err.message });
  }
};


export const getCategoriesById = async (req, res) => {
  try {
    const _id = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const categories = await categoryModel.findById({ _id }); //.populate('parentId', 'name slug')
     res.status(200).json({ success: true, message: 'Categories fetched successfully', categories });
  } catch (err) {
    res.status(500).json({success: false, message: "Error fetching categories", error: err.message });
  }
};

// Get category by slug
export const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug }).populate('parentId', 'name slug');
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ success: true, message: 'Categories fetched successfully', category });
  } catch (err) {
    res.status(500).json({success: false, message: "Error fetching categories", error: err.message });
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
    res.status(500).json({success: false, message: "Update failed", error: err.message });
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
