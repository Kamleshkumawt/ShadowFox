import uploadOnCloudinary from '../../db/cloudinary.js';
import sellerModel from '../../models/sellers.model.js';
import userModel from '../../models/user.model.js';
import categoryModel from '../../models/categories.model.js';
import { asyncHandler } from '../../middleware/errorHandler.js';

export const createSeller = asyncHandler(async (req, res) => {
    const { store_name, store_description, store_address, store_phone, gst_number,bank_details,policies } = req.body;
    const userId = req.user._id;

    if (!store_name || !store_description  || !store_address || !store_phone || !gst_number || !bank_details || !policies) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if(!req.file.path){
        return res.status(400).json({ error: 'Store image is required' });
    }
    const store_image = '';
    if(req.file && req.file.path){
        try {
            const result = await uploadOnCloudinary(req.file.path);
            if (result.success) {
                store_image = result.secure_url;
            } else {
                return res.status(400).json({ error: 'Failed to upload store image' });
            }
        } catch (error) {
            return res.status(400).json({ error: 'Failed to upload store image' });
        }
    }

    const existingSeller = await sellerModel.findOne({ userId });
    if (existingSeller) {
        return res.status(400).json({ error: 'You are already a seller' });
    }
    
    const seller = await sellerModel.create({
        userId,
        store_name,
        store_description,
        store_image,
        store_address,
        store_phone,
        gst_number,
        bank_details,
        policies
    });

    await userModel.findByIdAndUpdate(userId, { role: 'seller' });
    res.status(201).json({ success: true, message: 'Seller created successfully', seller});
});

export const getSellerByUserId = async (req, res) => {
    try {
        const userId = req.user._id;
        const seller = await sellerModel.findOne({ userId });
        res.status(200).json({ success: true, message: 'Seller fetched successfully', seller });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

export const updateSeller = async (req, res) => {
    try {
        const userId = req.user._id;
        const { store_name, store_description, store_address, store_phone, gst_number,bank_details,policies } = req.body;

        const seller = await sellerModel.findOneAndUpdate({ userId }, { store_name, store_description, store_address, store_phone, gst_number,bank_details,policies }, { new: true });
        
        res.status(200).json({ success: true, message: 'Seller updated successfully', seller });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

export const createCategoryController = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({ error: 'Name and description are required' });
        }

        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ error: 'Category with this name already exists' });
        }

        const category = await categoryModel.create({
            name,
            description
        })

        res.status(201).json({ success: true, message: 'Category created successfully', category });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

export const getCategoriesController = async (req, res) => {
    try {
        const categories = await categoryModel.find({ parentId: null });
        res.status(200).json({ success: true, message: 'Categories fetched successfully', categories });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}