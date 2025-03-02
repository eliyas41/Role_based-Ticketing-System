import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import dbConnect from '../config/dbConnect.js';

// db connect
dbConnect();
const app = express();

// pass incoming data
app.use(express.json());

//url encoded
app.use(express.urlencoded({ extended: true }));

export default app;