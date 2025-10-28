import { Router } from "express";
import {
  blockSellerByAdmin,
  blockUserByAdmin,
  createAdmin,
  createCategoryController,
  deleteCategory,
  deleteProductByAdmin,
  getAdmin,
  getAllAdminCategories,
  getAllOrders,
  getAllProducts,
  getAllSeller,
  getAllUsers,
  getOrdersById,
  getSellerByIdAdmin,
  getUserByIdAdmin,
  loginAdmin,
  logoutAdmin,
  updateAdmin,
  updateAdminPassword,
  updateCategory,
  updateOrderStatusByAdmin,
  updateSellerByAdmin,
  updateSellerPassByAdmin,
  updateUserPasswordByAdmin,
  updateUserProfileByAdmin,
} from "../controllers/index.js";
import { protect } from "../middleware/auth.middleware.js";
import { body, validationResult } from "express-validator";

const router = Router();

router.post(
  "/user/create",
  [
    body("phone")
      .notEmpty()
      .withMessage("phone is required")
      .isNumeric()
      .withMessage("phone must be numeric"),
    body("username")
      .notEmpty()
      .withMessage("firstName is required")
      .isLength({ max: 50 })
      .withMessage("firstName cannot be more than 50 characters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
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

      await createAdmin(req, res);
    } catch (error) {
      console.error("Admin creation error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during admin creation",
      });
    }
  }
);

router.post(
  "/user/login",
  [
    body("phone")
      .notEmpty()
      .withMessage("phone is required")
      .isNumeric()
      .withMessage("phone must be numeric"),
    body("password").notEmpty().withMessage("Password is required"),
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
      await loginAdmin(req, res);
    } catch (error) {
      console.error("Admin login error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during admin login",
      });
    }
  }
);

router.get("/user/me", protect, getAdmin);

router.get("/user/logout", protect, logoutAdmin);
router.put(
  "/user/update-details",
  protect,
  updateAdmin
);
router.put("/user/change", protect, updateAdminPassword);

router.post("/category/create", protect, createCategoryController);
router.get("/category/getCategories", protect, getAllAdminCategories);
router.put("/category/update/:id", protect, updateCategory);
router.delete("/category/delete/:id", protect, deleteCategory);
//  router.get('/category/getCategoryById/:id', protect, getCategoriesByParentId);

router.put("/orders/update", protect, updateOrderStatusByAdmin);


router.put("/user/update-profile", protect, updateUserProfileByAdmin);
router.put("/user/update-pass", protect, updateUserPasswordByAdmin);
router.put("/seller/update-profile", protect, updateSellerByAdmin);
router.put("/seller/update-pass", protect, updateSellerPassByAdmin);

router.get("/user/getUserById/:id", protect, getUserByIdAdmin);
router.get("/seller/getSellerById/:id", protect, getSellerByIdAdmin);

router.get("/orders/getById/:id", protect, getOrdersById);
router.put("/user/blocked/:id", protect, blockUserByAdmin);
router.put("/seller/blocked/:id", protect, blockSellerByAdmin);
router.delete("/products/delete/:id", protect, deleteProductByAdmin);



router.get("/user/getAll", protect, getAllUsers);
router.get("/seller/getAll", protect, getAllSeller);
router.get("/orders/getAll", protect, getAllOrders);
router.get("/products/getAll", protect, getAllProducts);

export default router;
