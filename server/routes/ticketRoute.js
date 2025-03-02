import express from "express";
import { createTicketCtrl } from "../controllers/ticketCtrl.js";

const ticketRoutes = express.Router();

ticketRoutes.post("/", createTicketCtrl);

export default ticketRoutes;
