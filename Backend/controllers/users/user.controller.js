import wishlistModel from "../../models/wishlists.model.js";

export const createWishlist = async (req, res) => {
    try {
        const {products} = req.body
        const userId = req.user._id;
        const wishlist = await wishlistModel.create({ userId, products });
        res.status(201).json(wishlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getWishlistByUserId = async (req, res) => {
    try {
        const userId = req.user._id;
        const wishlist = await wishlistModel.findOne({ userId });
        res.status(200).json({success: true, message: "Wishlist fetched successfully", wishlist});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateWishlist = async (req, res) => {
    try {
        const { products } = req.body;
        const userId = req.user._id;
        const wishlist = await wishlistModel.findOneAndUpdate({ userId }, { products }, { new: true });
        res.status(200).json({ success: true, message: "Wishlist updated successfully", wishlist});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const wishlist = await wishlistModel.findOneAndDelete({ userId });
        res.status(200).json({success: true, message: "Wishlist deleted successfully", wishlist});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}