import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Linking ticket to the User who created it
      required: true,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
