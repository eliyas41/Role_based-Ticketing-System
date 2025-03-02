import express from 'express';
import {
  signupUserCtrl,
  loginUserCtrl
} from '../controllers/userCtrl.js';

const userRoutes = express.Router();

userRoutes.post("/signup", signupUserCtrl);
userRoutes.post("/login", loginUserCtrl);

export default userRoutes;