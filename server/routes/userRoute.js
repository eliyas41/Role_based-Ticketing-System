import express from 'express';
import { registerUserCtrl } from '../controllers/userCtrl.js';

const userRoutes = express.Router();

userRoutes.post("/signup", registerUserCtrl);

export default userRoutes;