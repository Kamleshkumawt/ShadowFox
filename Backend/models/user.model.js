import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    date_of_birth: {
        type: Date,
    },
    email: {
        type: String,
        minLength: [6, "Email should be at least 5 characters long"],
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    phone: {
        type: String,
        unique: true,

    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    profile_picture:[{
    url: {
      type: String,
//      required: true
    },
    publicId: String,
    width: Number,
    height: Number,
    format: String,
    bytes: Number,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
    role: {
        type: String,
        enum: ['user', 'admin', 'seller'],
        default: 'user'
    },
    address: [{
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
    }],
    isDisabled: {
        type: Boolean,
        default: false
    },
    lastActive: {
        type: Date,
        default: Date.now
    }
},{ timestamps: true });

userSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateJWT = function() {
    return jwt.sign(
        { _id: this._id, isAdmin: this.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}

const User = mongoose.model('user', userSchema);

export default User;
