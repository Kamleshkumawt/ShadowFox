import productModel from "../../models/products.model.js";

export const getProductById = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .populate("categoryId", "name description");
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Product fetched successfully",
        product,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", errors: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate("categoryId", "name description");
    res
      .status(200)
      .json({
        success: true,
        message: "Products fetched successfully",
        products,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", errors: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const products = await productModel
      .find({ categoryId: req.params.id })
      .populate("categoryId", "name description");
      
    res
      .status(200)
      .json({
        success: true,
        message: "Products fetched successfully",
        products,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", errors: error.message });
  }
};

// check for admin who can see all products of a seller
export const getProductsBySellerId = async (req, res) => {
  try {
    const products = await productModel
      .find({ sellerId: req.params.id })
      .populate("categoryId", "name description");
    res
      .status(200)
      .json({
        success: true,
        message: "Products fetched successfully",
        products,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", errors: error.message });
  }
};

export const getProductsBySeller = async (req, res) => {
  try {
    const sellerId = req.user._id;
    console.log("sellerId", sellerId);
    const products = await productModel
      .find({ sellerId })
      .populate("categoryId", "name description");

    res
      .status(200)
      .json({
        success: true,
        message: "Products fetched successfully",
        products,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", errors: error.message });
  }
};

// get products by search query
export const searchProducts = async (req, res) => {
  try {
    const searchTerm = req.params.id.trim();

    const products = await productModel
      .find({
        slug: { $regex: searchTerm, $options: "i" }, // "i" = ignore case
      })
      .populate("categoryId", "name slug description");
    res
      .status(200)
      .json({
        success: true,
        message: "Products fetched successfully",
        products,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", errors: error.message });
  }
};

//get pending products for a seller
export const getProductsByStatusForSeller = async (req, res) => {
  try {
    const sellerId = req.user?._id;

    // const [pending, shipped, delivered, cancelled] = await Promise.all([
    //   productModel.find({ sellerId, status: "Pending" }),
    //   productModel.find({ sellerId, status: "Shipped" }),
    //   productModel.find({ sellerId, status: "Delivered" }),
    //   productModel.find({ sellerId, status: "Cancelled" })
    // ]);
    const [pending, shipped, delivered, cancelled] = await Promise.all([
      productModel.countDocuments({ sellerId, status: "Pending" }),
      productModel.countDocuments({ sellerId, status: "Shipped" }),
      productModel.countDocuments({ sellerId, status: "Delivered" }),
      productModel.countDocuments({ sellerId, status: "Cancelled" }),
    ]);

    // console.log("Pending Products: ", pending);

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products: {
        pending,
        shipped,
        delivered,
        cancelled,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      errors: error.message,
    });
  }
};
