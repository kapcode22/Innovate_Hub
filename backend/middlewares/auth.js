import { User } from "../models/userSchema.js";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthorized = catchAsyncError(async (req, res, next) => {
  // checking user input for login is correct is or not 
  //  After the user logs in, a token is generated, containing the user’s role as one of the claims. 
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }
//When the token is sent with requests, middleware on the backend verifies the token,
// then decodes it to read the user's role.
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
// if user is registered then based on role ,restricted routes are enforced on the server side
  if (!req.user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  next();
});