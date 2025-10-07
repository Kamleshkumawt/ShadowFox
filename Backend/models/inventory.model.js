import mongoose  from "mongoose";

const inventorySchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    quantity_sold: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

const Inventory = mongoose.model('inventory', inventorySchema);

export default Inventory;