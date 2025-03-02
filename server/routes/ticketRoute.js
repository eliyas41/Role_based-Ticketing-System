import express from "express";
import { createTicketCtrl } from "../controllers/ticketCtrl.js";
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const ticketRoutes = express.Router();

ticketRoutes.post("/", isLoggedIn, createTicketCtrl);

export default ticketRoutes;
