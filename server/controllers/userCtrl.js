import User from "../model/User.js";
import asyncHandler from "express-async-handler"
import bcrypt from 'bcryptjs';
import appError from "../utils/appError.js";
import generateToken from "../utils/generate_JWT_Token.js";

// @desc    Register user
// @route   POST /api/v1/user/signup
// @access  public
export const signupUserCtrl = asyncHandler(async (req, res) => {
  const { fullname, email, password, role } = req.body;

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
    role: role || 'user',  // Default to 'user' if role is not provided
  });

  res.status(201).json({
    status: "success",
    message: "User Registered Successfully",
    data: user,
  });
});

// @desc    Login user
// @route   POST /api/v1/user/login
// @access  Public
export const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Find the user in the database by email
  const userFound = await User.findOne({
    email,
  });

  // Check if user password is correct with the hashed password
  const isPasswordMatched = await bcrypt.compare(password, userFound?.password);
  // Generate token using user id and role
  const token = generateToken({ id: userFound?._id, role: userFound?.role });

  if (userFound && isPasswordMatched) {
    // if the user is found and the password is correct 
    return res.json({
      status: "success",
      message: "User logged in successfully",
      userFound,
      token
    })
  } else {
    throw new appError("Invalid login credentials", 401);
  }
});

// @desc    Get all users if an (Admin) or user's own account (User)
// @route   GET /api/v1/users
// @access  Private/Admin
export const getUserCtrl = asyncHandler(async (req, res) => {
  let user;
  const user_id = req.userAuthId.id
  if (req.userAuthId.role === "admin") {
    // Admin can see all tickets
    user = await User.find();
  } else {
    // Users can only see their own tickets
    user = await User.find({ _id: user_id });
    console.log(user)
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});