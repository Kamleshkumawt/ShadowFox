import wishlistModel from "../../models/wishlists.model.js";
import userModel from "../../models/user.model.js";

export const createWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const userId = req.user._id;
    const existingWishlist = await wishlistModel.findOne({ userId });

    if (existingWishlist) {
      // Check if the product is already in the wishlist
      const isProductAlreadyInWishlist = existingWishlist.products.some(
        (item) => item.productId.toString() === productId.toString()
      );

      if (!isProductAlreadyInWishlist) {
        existingWishlist.products.push({ productId });
        await existingWishlist.save();
      }


      // Return updated wishlist
      return res
        .status(200)
        .json({ message: "Wishlist updated", wishlist: existingWishlist });
    } else {
      // Create new wishlist
      const newWishlist = await wishlistModel.create({
        userId,
        products: [{ productId }],
      });
      return res
        .status(201)
        .json({
          success: true,
          message: "Wishlist created",
          wishlist: newWishlist,
        });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWishlistByUserId = async (req, res) => {
  try {
    const userId = req.user._id;
    const wishlist = await wishlistModel
      .findOne({ userId })
      .populate("products.productId");
    res
      .status(200)
      .json({
        success: true,
        message: "Wishlist fetched successfully",
        wishlist,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    // console.log('productId to remove :', productId);
    const userId = req.user._id;
    const wishlist = await wishlistModel.findOneAndUpdate(
      { userId }, // find wishlist by user
      { $pull: { products: { productId } } }, // remove product from array
      { new: true } // return updated wishlist
    );

    // console.log('response wishlist :', wishlist);
    res
      .status(200)
      .json({
        success: true,
        message: "Wishlist updated successfully",
        wishlist,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const wishlist = await wishlistModel.findOneAndDelete({ userId });
    // console.log('response wishlist :', wishlist);
  
    res
      .status(200)
      .json({
        success: true,
        message: "Wishlist deleted successfully",
        wishlist,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAddressById = async (req, res) => {
  try {
    const userId = req.user._id;
    const { address } = req.body;
    const addressId = address._id;
    const user = await userModel.findOneAndUpdate(
      { _id: userId, "address._id": addressId },
      { $set: { "address.$": address } },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "Address updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
export const addNewAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { address } = req.body;
    const user = await userModel.findOneAndUpdate(
      { _id: userId },
      { $push: { address: address } },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "Address updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
