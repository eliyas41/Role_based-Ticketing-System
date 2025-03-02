import Ticket from "../model/Ticket.js";
import asyncHandler from "express-async-handler";
import appError from "../utils/appError.js";

// @desc    Create a support ticket
// @route   POST /api/v1/tickets
// @access  Private (User can only create their own tickets)
export const createTicketCtrl = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  // extract user id from the authenticated user
  const user_id = req.userAuthId.id;
  // console.log(user_id)

  // Create the ticket linked to the authenticated user
  const ticket = await Ticket.create({
    title,
    description,
    status: status || "Open", // Default to "Open" if no status is provided
    user: user_id, // Linking to the logged-in user's ID
  });

  res.status(201).json({
    status: "success",
    message: "Ticket created successfully",
    data: ticket,
  });
});

// @desc    Get all tickets (Admin) or user's own tickets (User)
// @route   GET /api/v1/tickets
// @access  Private
export const getTicketsCtrl = asyncHandler(async (req, res) => {
  let tickets;
  const user_id = req.userAuthId.id;

  if (req.userAuthId.role === "admin") {
    // Admin can see all tickets
    tickets = await Ticket.find();
  } else {
    // Users can only see their own tickets
    tickets = await Ticket.find({ user: user_id });
  }

  res.status(200).json({
    status: "success",
    data: tickets,
  });
});

// @desc    Update a support ticket status (only admins can update all tickets)
// @route   PUT /api/v1/tickets/:id
// @access  Private/Admin
export const updateTicketCtrl = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;  // Only updating status

  // Find the ticket by its ID
  let ticket = await Ticket.findById(id);

  if (!ticket) {
    throw new appError("Ticket not found", 404);
  }

  // Check if the user is an admin
  if (req.userAuthId.role !== "admin") {
    throw new appError("You are not authorized to update this ticket", 403);
  }

  // If admin, update the ticket's status
  ticket.status = status || ticket.status;  // Keep current status if no new status provided

  // Save the updated ticket
  await ticket.save();

  res.status(200).json({
    status: "success",
    message: "Ticket updated successfully",
    data: ticket,
  });
});
