import User from "../model/User.js";
import asyncHandler from "express-async-handler"
import bcrypt from 'bcryptjs';
import appError from "../utils/appError.js";


// @desc    Register user
// @route   POST /api/v1/users/signup
// @access  Private/Admin
export const registerUserCtrl = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  // Check user exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    // throw
    throw new appError("User already exist", 400);
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Create the user
  const user = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    status: "success",
    message: "User Registered Successfully",
    data: user,
  });
});
