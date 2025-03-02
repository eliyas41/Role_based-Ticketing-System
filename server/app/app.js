import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import dbConnect from '../config/dbConnect.js';
import userRouter from '../routes/userRoute.js';

// db connect
dbConnect();
const app = express();

// pass incoming data
app.use(express.json());

//url encoded
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/users/", userRouter);

export default app;