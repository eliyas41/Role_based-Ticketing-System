import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();
import dbConnect from '../config/dbConnect.js';
import { globalErrHandler, notFound } from '../middlewares/globalErrHandler.js';
import userRouter from '../routes/userRoute.js';
import ticketRouter from '../routes/ticketRoute.js';

// db connect
dbConnect();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200
}
const app = express();
app.use(cors(corsOptions))

// pass incoming data
app.use(express.json());

//url encoded
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/user/", userRouter);
app.use("/api/v1/tickets", ticketRouter);

// err middleware
app.use(notFound);
app.use(globalErrHandler)

export default app;