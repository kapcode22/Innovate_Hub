import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";
// const Token = require("../models/tokenSchema");
// const sendEmail = require("../utils/sendEmail.js");
// const crypto = require("crypto");

// Register user
export const register = catchAsyncError(async (req, res, next) => {
  let { name, email, phone, role, password } = req.body;
  console.log(req.body); // Log the request body for debugging

  // Normalize the role input to match the enum values
  role = role.trim();

  if (!name || !email || !phone || !role || !password) {
    return next(new ErrorHandler("Please fill the full registration form", 400));
  }

  // Check if the email already exists
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already exists", 400));
  }

  // Create a new user
  const user = await User.create({
    name,
    email,
    phone,
    role,
    password,
  });

  // Generate a verification token and send email
//   const token = await new Token({
//     userId: user._id,
//     token: crypto.randomBytes(32).toString("hex"),
//   }).save();

//   const url = `${process.env.BASEURL}users/${user._id}/verify/${token.token}`;
//   await sendEmail(user.email, "Verify Email", url);

//   res.status(201).json({
//     success: true,
//     message: "An email has been sent to verify your account.",
//     user,
//   });
});

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
