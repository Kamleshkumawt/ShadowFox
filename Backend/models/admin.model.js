import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema({
    phone:{
        type:String,
       required: true,
    },
    username:{
        type:String,
        required: true,
    },
    password:{
        type:String,
       required: true,
        select:false
    },
    isDisabled: {
        type: Boolean,
        default: false,
    },
    profile_picture: {
      url: {
        type: String,
      },
      publicId: String,
      width: Number,
      height: Number,
      format: String,
      bytes: Number,
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
    lastActive: {
        type: Date,
        default: Date.now
    }
},{timestamps:true});

adminSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

adminSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

adminSchema.methods.generateJWT = function() {
    return jwt.sign(
        { _id: this._id, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '50d' }
    );
};

const Admin = mongoose.model('admin', adminSchema)

export default Admin;