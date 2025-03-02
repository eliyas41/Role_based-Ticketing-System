import express from "express";
import {
  createTicketCtrl,
  getTicketsCtrl,
  updateTicketCtrl
} from "../controllers/ticketCtrl.js";

import { authMiddleware } from '../middlewares/authMiddleware.js';

const ticketRoutes = express.Router();

ticketRoutes.post("/", authMiddleware, createTicketCtrl);
ticketRoutes.get("/", authMiddleware, getTicketsCtrl);
ticketRoutes.put("/:id", authMiddleware, updateTicketCtrl);

export default ticketRoutes;
