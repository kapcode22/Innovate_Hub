import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";
// const Token = require("../models/tokenSchema");
// const sendEmail = require("../utils/sendEmail.js");
// const crypto = require("crypto");

// Register user
export const register = async (req, res, next) => {
  try {
    let { name, email, phone, role, password } = req.body;
    console.log("Incoming Registration Request:", req.body); // Check if request is received

    if (!name || !email || !phone || !role || !password) {
      console.log("Error: Missing Fields");
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    const isEmail = await User.findOne({ email });
    if (isEmail) {
      console.log("Error: Email already exists");
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const user = await User.create({ name, email, phone, role, password });
    console.log("User Registered Successfully:", user);

    res.status(201).json({ success: true, message: "User registered successfully", user });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Login user
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email, password, and role.", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid password.", 400));
  }

//   if (!user.verified) {
//     let token = await Token.findOne({ userId: user._id });

//     if (!token) {
//       token = await new Token({
//         userId: user._id,
//         token: crypto.randomBytes(32).toString("hex"),
//       }).save();

//       const url = `${process.env.BASEURL}users/${user._id}/verify/${token.token}`;
//       await sendEmail(user.email, "Verify Email", url);
//     }

//     return res.status(201).send({ message: "An email has been sent to your account for verification." });
//   }

  if (user.role !== role) {
    return next(new ErrorHandler("Invalid role.", 404));
  }

  sendToken(user, 201, res, "User logged in successfully");
});

// Logout user
export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User logged out successfully",
    });
});

// Get user details
export const getUser = catchAsyncError(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});
