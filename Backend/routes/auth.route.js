import {Router} from 'express';
import {loginController, logoutController, profileController, registerController, updateProfileController, updateProfilePasswordController, verifyAccount} from '../controllers/index.js'
import { body, validationResult } from 'express-validator';
import {protect} from '../middleware/index.js'
import upload from '../middleware/multer.js';

const router = Router();

router.post('/register', [
    // body('firstName').trim().notEmpty().withMessage('firstName is required').isLength({ max: 50 }).withMessage('firstName cannot be more than 50 characters'),
    // body('lastName').trim().notEmpty().withMessage('lastName is required').isLength({ max: 50 }).withMessage('lastName cannot be more than 50 characters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            });
        }
        
        // Call the controller
        await registerController(req, res);
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration'
        });
    }
});

router.post('/login', [
    body('password').notEmpty().withMessage('Password is required')
],async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            });
        }
        // Call the controller
        await loginController(req, res);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
});

router.get('/me', protect, profileController);

router.get('/logout', protect, logoutController);

router.put('/change-password', protect, [
    body('oldPassword').notEmpty().withMessage('Old password is required'), 
    body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req,res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            });
        }

        await updateProfilePasswordController(req, res);
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during password change'
        })   
    }
})

router.put('/update-profile', protect, upload.single('profileImage'), async (req,res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            })
        } 
        console.log('File info:', req.file);
        console.log('Form data:', req.body);

        await updateProfileController(req, res);
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during profile update'
        })   
    }
});

router.post('verify-account', verifyAccount);

export default router;