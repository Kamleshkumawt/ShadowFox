import mongoose, { mongo } from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    total_amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['Pending','Shipped','Delivered','Cancelled'],
        default:'Pending'
    },
    shipping_address: {
        name: {
            type: String,
        },
        contact: {
            type: String,
        },
        label: {
            type: String,
            default: 'Home'
        },
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
            default: 'India'
        },
        postalCode: {
            type: String,
        },
        famousPlaces: {
            type: String,
        },
        isDefault: {
            type: Boolean,
            default: false
        },
        latitude: {
            type: String,
        },
        longitude: {
            type: String,
        }
    },
    payment_method:{
        type:String,
        enum:['cash_on_delivery','online_payment'],
        default:'cash_on_delivery'
    },
    tracking_number:{
        type:String,
        unique:true,
        sparse:true
    },
    items:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'product',
            required:true
        },
        quantity:{
            type:Number,
            required:true
        }
    }],
    paymentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payment',
        default: null
    }
},{timestamps:true});

const Order = mongoose.model('order',orderSchema);

export default Order;