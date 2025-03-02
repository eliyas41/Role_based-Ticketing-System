import express from "express";
import {
  createTicketCtrl,
  getTicketsCtrl
} from "../controllers/ticketCtrl.js";

import { authMiddleware } from '../middlewares/authMiddleware.js';

const ticketRoutes = express.Router();

ticketRoutes.post("/", authMiddleware, createTicketCtrl);
ticketRoutes.get("/", authMiddleware, getTicketsCtrl);

export default ticketRoutes;
