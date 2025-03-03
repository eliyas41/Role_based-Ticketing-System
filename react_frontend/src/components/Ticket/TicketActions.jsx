import React, { useState } from "react";
import { updateTicketStatus } from "../../utils/ticketService";
import getAuth from "../../utils/auth";

const TicketActions = ({ ticket, onStatusChange }) => {
  const [newStatus, setNewStatus] = useState(ticket.status);

  const handleStatusChange = async (e) => {
    const selectedStatus = e.target.value;
    setNewStatus(selectedStatus);

    try {
      const loggedInUser = await getAuth();
      const { user_token: token } = loggedInUser;

      const updatedTicket = await updateTicketStatus(token, ticket._id, selectedStatus);

      if (onStatusChange) {
        onStatusChange(ticket._id, selectedStatus); // Update the parent component with new status
      }

      console.log(updatedTicket); // Optional: You can log the updated ticket response
    } catch (error) {
      console.error("Error updating ticket status:", error.message);
    }
  };

  // Function to determine the color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-green-500";
      case "In Progress":
        return "bg-yellow-500";
      case "Closed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="mt-2">
      <select
        value={newStatus}
        onChange={handleStatusChange}
        className={`p-2 border rounded ${getStatusColor(newStatus)} text-white`}
      >
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>
    </div>
  );
};

export default TicketActions;
