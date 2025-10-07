import {Router} from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, getProductsByCategory, getProductsBySeller, getProductsBySellerId, updateProduct } from '../controllers/index.js';
import {body, validationResult} from 'express-validator';
import { protect} from '../middleware/index.js';
import upload from '../middleware/multer.js';

const router = Router();


router.post('/create', protect, 
    upload.fields([
    { name: 'images', maxCount: 5 }
    ]),
   [
    body('name').trim().notEmpty().withMessage('name is required').isLength({ max: 50 }).withMessage('name cannot be more than 50 characters'),
    body('description').trim().notEmpty().withMessage('description is required').isLength({ max: 1000 }).withMessage('description cannot be more than 1000 characters'),
    body('price').isNumeric().withMessage('price must be a number'),
    body('quantity').isNumeric().withMessage('quantity must be a number'),
    body('color').trim().notEmpty().withMessage('color is required').isLength({ max: 50 }).withMessage('color cannot be more than 50 characters'),
    body('brand').trim().notEmpty().withMessage('brand is required').isLength({ max: 50 }).withMessage('brand cannot be more than 50 characters'),
    body('category').trim().notEmpty().withMessage('category is required').isLength({ max: 50 }).withMessage('category cannot be more than 50 characters'),
    body('weight').isNumeric().withMessage('weight must be a number'),
    body('dimensions').trim().notEmpty().withMessage('dimensions is required').isLength({ max: 50 }).withMessage('dimensions cannot be more than 50 characters'),
    body('status').isIn(['active', 'inactive', 'out of stock']).withMessage('status must be available, unavailable or out of stock'),
    body('tags').custom(value => {
      try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) throw new Error('tags must be an array');
        return true;
      } catch (e) {
        throw new Error('tags must be a valid JSON array');
      }
    }),

], async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            });
        }

        // At this point, req.body and req.files are populated correctly
      req.body.tags = JSON.parse(req.body.tags); // Parse to actual array
      req.body.dimensions = JSON.parse(req.body.dimensions); // Optional: if sent as JSON

        // Call the controller
        await createProduct(req, res);
    } catch (error) {
        console.error('Product creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during product creation'
        });
    }
});

router.get('/getAll', protect, async (req, res) => {
    try {
        await getProducts(req, res);
    } catch (error) {
        console.error('Product creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during product creation'
        });
    }
});

router.get('/:id',protect, getProductById);

router.get('/category/:id',protect, getProductsByCategory);

router.get('/seller/:id', protect,getProductsBySellerId);

router.get('/sellerId', protect,getProductsBySeller); //not hit route

router.put('/update', protect, async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array()
            });
        }
        await updateProduct(req, res);
    } catch (error) {
        console.error('Product update error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during product update'
        });
    }
});

router.delete('/delete/:id',protect, deleteProduct);

export default router;