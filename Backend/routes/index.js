import {Router} from 'express';
import authRouter from './auth.route.js';
import productRoute from './product.route.js';
import userRoute from './user.route.js';

const router = Router();


router.use('/auth', authRouter);
router.use('/products', productRoute);
router.use('/users', userRoute);


// Health check endpoint
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString()
    });
});

export default router;