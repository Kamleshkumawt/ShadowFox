import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const sellerSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    store_name: {
        type: String,
    },
    mangerName : {
      type: String,
    },
    store_description: {
        type: String,
    },
    store_image: {
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
    store_address:
      {
        label: {
          type: String,
          default: "Home",
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
          default: "India",
        },
        postalCode: {
          type: String,
        },
        famousPlaces: {
          type: String,
        },
        isDefault: {
          type: Boolean,
          default: false,
        },
        latitude: {
          type: String,
        },
        longitude: {
          type: String,
        },
      },
    store_phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gst_number: {
        type: String,
    },
    bank_details: {
        account_number: { type: String,  },
        ifsc_code: { type: String, },
        bank_name: { type: String,  },
        account_holder_name: { type: String, },
    },
    rating_avg: {
        type: Number,
        default: 0,
        min: 0,
        max: 10,
    },
    policies: {
        return_policy: { type: String,  },
        shipping_policy: { type: String,  },
    },
    isDisabled: {
        type: Boolean,
        default: false,
    },
    lastActive: {
        type: Date,
    },
},{ timestamps: true });

sellerSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

sellerSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

sellerSchema.methods.generateJWT = function() {
    return jwt.sign(
        { id: this._id, role: 'seller' },
        process.env.JWT_SECRET,
        { expiresIn: '50d' }
    );
};

const Seller = mongoose.model('seller', sellerSchema);
export default Seller;