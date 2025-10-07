import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    store_name: {
        type: String,
        required: true,
    },
    store_description: {
        type: String,
        required: true,
    },
    store_image: {
        type: String,
        required: true,
    },
    store_address: {
        type: String,
        required: true,
    },
    store_phone: {
        type: String,
        required: true,
    },
    gst_number: {
        type: String,
        required: true,
    },
    bank_details: {
        account_number: { type: String, required: true },
        ifsc_code: { type: String, required: true },
        bank_name: { type: String, required: true },
        account_holder_name: { type: String, required: true },
    },
    rating_avg: {
        type: Number,
        default: 0,
        min: 0,
        max: 10,
    },
    policies: {
        return_policy: { type: String, required: true },
        shipping_policy: { type: String, required: true },
    }
},{ timestamps: true });

const Seller = mongoose.model('seller', sellerSchema);
export default Seller;