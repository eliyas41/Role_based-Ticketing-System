import React, { useState } from "react";
import { Select, message } from "antd";
import { updateTicketStatus } from "../../utils/ticketService";
import getAuth from "../../utils/auth";

const { Option } = Select;

const TicketActions = ({ ticket, onStatusChange }) => {
  const [newStatus, setNewStatus] = useState(ticket.status);

  const handleStatusChange = async (selectedStatus) => {
    setNewStatus(selectedStatus);

    try {
      const loggedInUser = await getAuth();
      const { user_token: token } = loggedInUser;

      const updatedTicket = await updateTicketStatus(token, ticket._id, selectedStatus);

      if (onStatusChange) {
        onStatusChange(ticket._id, selectedStatus); // Update the parent component with new status
      }

      message.success("Ticket status updated successfully!");
    } catch (error) {
      console.error("Error updating ticket status:", error.message);
      message.error("Failed to update ticket status.");
    }
  };

  // Function to determine the color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "green";
      case "In Progress":
        return "orange";
      case "Closed":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className="mt-2">
      <Select
        value={newStatus}
        onChange={handleStatusChange}
        style={{ width: 120 }} // Adjust the width here to make it smaller
        dropdownStyle={{ backgroundColor: '#f5f5f5' }}
        className={`ticket-status-select-${getStatusColor(newStatus)}`}
      >
        <Option value="Open" className="text-green-500">Open</Option>
        <Option value="In Progress" className="text-yellow-500">In Progress</Option>
        <Option value="Closed" className="text-red-500">Closed</Option>
      </Select>
    </div>
  );
};

export default TicketActions;
