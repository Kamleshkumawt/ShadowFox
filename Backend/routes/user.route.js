import { Router } from "express";
import { body, validationResult } from "express-validator";

import {
  addNewAddress,
  callbackPayment,
  createCart,
  createCategoryController,
  createOrder,
  createPayment,
  createSeller,
  createWishlist,
  deleteCart,
  deleteWishlist,
  getAllCategories,
  getAllReturns,
  getAllReturnsBySellerId,
  getCartByUserId,
  getCategories,
  getCategoriesById,
  getCategoriesByParentId,
  getCategoryBySlug,
  getOrdersBySellerId,
  getOrdersByUserId,
  getReviewsByProductId,
  getSellerByUserId,
  getWishlistByUserId,
  returnsController,
  reviewsController,
  updateAddressById,
  updateCart,
  updateSeller,
  updateWishlist,
} from "../controllers/index.js";
import { protect } from "../middleware/index.js";
import upload from "../middleware/multer.js";

const router = Router();


router.put("/updatedAddressById", protect, updateAddressById);
router.put("/addNewAddress", protect, addNewAddress);

router.post(
  "/seller/register",
  protect,
  upload.single("store_image"),
  [
    body("store_name").notEmpty().withMessage("Store name is required"),
    body("store_description")
      .notEmpty()
      .withMessage("Store description is required"),
    body("store_address").notEmpty().withMessage("Store address is required"),
    body("store_phone").notEmpty().withMessage("Store phone is required"),
    body("gst_number").notEmpty().withMessage("GST number is required"),
    body("bank_details").notEmpty().withMessage("Bank details are required"),
    body("policies").notEmpty().withMessage("Policies are required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        });
      }

      // Call the controller
      await createSeller(req, res);
    } catch (error) {
      console.error("seller creation error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during product creation",
      });
    }
  }
);


router.put("/seller/update", protect, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        errors: errors.array(),
      });
    }
    await updateSeller(req, res);
  } catch (error) {
    console.error("seller update error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during product update",
    });
  }
});

router.get("/seller/me", protect, getSellerByUserId);

router.post("/cart/create", protect, createCart);
router.get("/cart/getCart", protect, getCartByUserId);
router.put("/cart/update", protect, updateCart);
router.put("/cart/delete", protect, deleteCart);

router.post(
  "/order/create",
  protect,
  [
    body("total_amount")
      .isNumeric()
      .withMessage("total_amount must be a number"),
    body("shipping_address")
      .notEmpty()
      .withMessage("shipping_address is required"),
    body("payment_method").notEmpty().withMessage("payment_method is required"),
    body("items").isArray().withMessage("items must be an array"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        });
      }

      await createOrder(req, res);
    } catch (error) {
      console.error("Order creation error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during order creation",
      });
    }
  }
);

router.get("/order/getUser", protect, getOrdersByUserId);

router.get("/order/getSeller/:id", protect, getOrdersBySellerId);

router.post(
  "/payment",
  protect,
  [
    body("amount").isNumeric().withMessage("amount must be a number"),
    body("payment_method").notEmpty().withMessage("payment_method is required"),
    body("order_id").notEmpty().withMessage("order_id is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        });
      }
      await createPayment(req, res);
    } catch (error) {
      console.error("Order creation error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during order creation",
      });
    }
  }
);

router.post("/payment/callback", protect, callbackPayment);


router.post('/returns/products', protect,
    [
        body('orderId').notEmpty().withMessage('orderId is required'),
        body('reason').notEmpty().withMessage('reason is required'),
        body('refundAmount').isNumeric().withMessage('refundAmount must be a number'),
        body('status').isIn(['pending', 'approved', 'rejected']).withMessage('status must be pending, approved or rejected'),
    ], returnsController);

router.get('/returns/getAllProducts', protect, getAllReturnsBySellerId);

router.get('/returns/getAllReturns', protect, getAllReturns);

 router.post('/review/create', protect,[
    body('productId').notEmpty().withMessage('productId is required'),
    body('rating').isNumeric().withMessage('rating must be a number'),
    body('comment').notEmpty().withMessage('comment is required'),
 ], reviewsController);

 {/* not implementes*/}
 router.get('/review/getProduct/:id', protect, getReviewsByProductId);

 router.post('/wishlist/create', protect, createWishlist);

 router.get('/wishlist/get', protect, getWishlistByUserId);
 
 router.put('/wishlist/update', protect, updateWishlist);

 router.delete('/wishlist/delete', protect, deleteWishlist);

 {/** not implementes*/}
 router.post('/category/create', protect, createCategoryController);
 router.get('/category/getAllCategories', protect, getCategories);
 router.get('/category/getCategories', protect, getAllCategories);
 router.get('/category/getCategory/:slug', protect, getCategoryBySlug);
 router.get('/category/getCategoryById/:id', protect, getCategoriesByParentId);
 router.get('/category/getCategorySelfById/:id', protect, getCategoriesById);
 
export default router;
