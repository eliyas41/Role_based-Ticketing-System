import express from 'express';
import {
  signupUserCtrl,
  loginUserCtrl,
  getUserCtrl
} from '../controllers/userCtrl.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post("/signup", signupUserCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/", authMiddleware, getUserCtrl);

export default userRoutes;