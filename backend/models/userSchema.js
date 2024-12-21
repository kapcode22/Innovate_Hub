import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide your name!"],
        minLength: [3, "Name must contain at least 3 characters"],
        maxLength: [30, "Name cannot exceed 30 characters!"],
    },
    email: {
        type: String,
        required: [true, "please provide your email!"],
        validate: [validator.isEmail, "please provide a valid email"],
    },
    phone: {
        type: Number,
        required: [true, "please provide your phone number!"],
    },
    role: {
        type: String,
        required: [true, "please provide your role"],
        enum: ["Project Seeker", "Project Head"],
    },
    password: {
        type: String,
        required: [true, "please provide your password!"],
        minLength: [6, "password must contain at least 6 characters"],
        maxLength: [30, "password cannot exceed 30 characters!"],
        select: false,
    },
    verified:{
        type:Boolean,
        default:false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Hashing the password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// Comparing password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generating a JWT token for authorization
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Creating the User model
export const User = mongoose.model("User", userSchema);
