import {Router} from 'express';
import { createAdmin, createCategoryController, deleteCategory, getAdmin, getAllSeller, getAllUsers, getCategories, loginAdmin, logoutAdmin, updateAdmin, updateAdminPassword, updateCategory } from '../controllers/index.js';
import { protect } from '../middleware/auth.middleware.js';
import { body, validationResult } from 'express-validator';
import upload from '../middleware/multer.js';

const router = Router();

router.post('/user/create',  [
     body('phone')
    .notEmpty().withMessage('phone is required')
    .isNumeric().withMessage('phone must be numeric'),
    body('username').notEmpty().withMessage('firstName is required').isLength({ max: 50 }).withMessage('firstName cannot be more than 50 characters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            });
        }

        await createAdmin(req, res);
    } catch (error) {
        console.error('Admin creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during admin creation'
        })   
    }
});

router.post('/user/login', [
     body('phone')
    .notEmpty().withMessage('phone is required')
    .isNumeric().withMessage('phone must be numeric'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            });
        }
        await loginAdmin(req, res);
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during admin login'
        })
    }
});

router.get('/user/me', protect, getAdmin);

router.get('/user/logout', protect, logoutAdmin);
router.put('/user/update-details', protect, upload.single('profileImage'), updateAdmin);
router.put('/user/change', protect, updateAdminPassword);

 router.post('/category/create', protect, createCategoryController);
 router.get('/category/getCategories', protect, getCategories);
 router.put('/category/update/:id', protect, updateCategory);
 router.delete('/category/delete/:id', protect, deleteCategory);
//  router.get('/category/getCategoryById/:id', protect, getCategoriesByParentId);

router.get('/user/getAll', protect, getAllUsers);
router.get('/seller/getAll', protect, getAllSeller);

export default router;