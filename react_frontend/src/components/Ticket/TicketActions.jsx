import React from "react";
import { updateTicketStatus } from "../../utils/ticketService";
import getAuth from "../../utils/auth";

const TicketActions = ({ ticket }) => {
  const handleStatusUpdate = async (newStatus) => {
    try {
      const loggedInUser = await getAuth();
      const { user_token: token } = loggedInUser;

      const updatedTicket = await updateTicketStatus(token, ticket._id, newStatus);
      // Optionally, you can lift the state to the parent component to update the ticket list
    } catch (error) {
      console.error("Error updating ticket status:", error.message);
    }
  };

  return (
    <div className="mt-2">
      <button
        onClick={() => handleStatusUpdate("Open")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Mark as Open
      </button>
      <button
        onClick={() => handleStatusUpdate("In Progress")}
        className="bg-yellow-500 text-white px-4 py-2 rounded ml-2"
      >
        Mark as In Progress
      </button>
      <button
        onClick={() => handleStatusUpdate("Closed")}
        className="bg-red-500 text-white px-4 py-2 rounded ml-2"
      >
        Mark as Closed
      </button>
    </div>
  );
};

export default TicketActions;
