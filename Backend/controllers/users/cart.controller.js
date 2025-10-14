import cartModel from '../../models/carts.model.js';

export const createCart = async (req, res) => {
    try {
        const { items } = req.body;

        console.log('req.body',req.body);
        console.log('items',items);
        const userId = req.user._id;
        const newCart = new cartModel({ userId, items });
        await newCart.save();
        res.status(201).json({ success: true, message: 'Cart created successfully', newCart});
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

export const getCartByUserId = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await cartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        res.status(200).json({ success: true, message: 'Cart fetched successfully', cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

export const updateCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { items } = req.body;
        const cart = await cartModel.findOneAndUpdate({ userId }, { items }, { new: true });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        res.status(200).json({ success: true, message: 'Cart updated successfully', cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

export const deleteCart = async (req, res) => {
    try {
        const {id} = req.body;
        const userId = req.user._id;
        //remove  cart product  by product id
        const cart = await cartModel.findByIdAndUpdate(userId, { $pull: { items: { productId: id } } }, { new: true });   
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        res.status(200).json({ success: true, message: 'Cart deleted successfully', cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}