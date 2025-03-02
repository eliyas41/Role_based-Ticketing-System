import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import dbConnect from '../config/dbConnect.js';
import { globalErrHandler, notFound } from '../middlewares/globalErrHandler.js';
import userRouter from '../routes/userRoute.js';
import ticketRouter from '../routes/ticketRoute.js';

// db connect
dbConnect();
const app = express();

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