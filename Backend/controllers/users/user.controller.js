import wishlistModel from "../../models/wishlists.model.js";
import productModel from "../../models/products.model.js";

export const createWishlist = async (req, res) => {
    try {
        const {productId} = req.body;
        
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

          const product = await productModel.findOne({ _id: productId });
          product.isWishlist = true;
          await product.save();
      
          // Return updated wishlist
          return res.status(200).json({ message: 'Wishlist updated', wishlist: existingWishlist });
        } else {
          // Create new wishlist
          const newWishlist = await wishlistModel.create({
            userId,
            products: [{ productId }],
          });
          
          const product = await productModel.findOne({ _id: productId });
          product.isWishlist = true;
          await product.save();
          return res.status(201).json({ success: true, message: 'Wishlist created', wishlist: newWishlist });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getWishlistByUserId = async (req, res) => {
    try {
        const userId = req.user._id;
        const wishlist = await wishlistModel.findOne({ userId }).populate('products.productId');
        res.status(200).json({success: true, message: "Wishlist fetched successfully", wishlist});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;
        const wishlist = await wishlistModel.findOneAndRemove({ userId }, { products : [{ productId }]}, { new: true });
         const product = await productModel.findOne({ _id: productId });
          product.isWishlist = false;
          await product.save();
        console.log('response wishlist :', wishlist);
        res.status(200).json({ success: true, message: "Wishlist updated successfully", wishlist});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const wishlist = await wishlistModel.findOneAndDelete({ userId });
        console.log('response wishlist :', wishlist);
        //all product isWishlist false
        await productModel.updateMany(
            { userId },
            { $set: { isWishlist: false } }
        );
        res.status(200).json({success: true, message: "Wishlist deleted successfully", wishlist});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}