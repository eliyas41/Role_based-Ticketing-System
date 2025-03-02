import Ticket from "../model/Ticket.js";
import asyncHandler from "express-async-handler";
import appError from "../utils/appError.js";

// @desc    Create a support ticket
// @route   POST /api/v1/tickets
// @access  Private (User can only create their own tickets)
export const createTicketCtrl = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  // Create the ticket linked to the authenticated user
  const ticket = await Ticket.create({
    title,
    description,
    status: status || "Open", // Default to "Open" if no status is provided
    user: req.user.id, // Linking to the logged-in user's ID
  });

  res.status(201).json({
    status: "success",
    message: "Ticket created successfully",
    data: ticket,
  });
});
