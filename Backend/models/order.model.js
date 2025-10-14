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
    shipping_address:{
        type:String,
        required:true
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
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'seller',
        required:true
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