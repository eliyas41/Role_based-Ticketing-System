import React from "react";
import TicketItem from "./TicketItem";

const TicketList = ({ tickets, isAdmin }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {tickets.length > 0 ? (
        tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} isAdmin={isAdmin} />
        ))
      ) : (
        <p className="text-gray-500">No tickets found.</p>
      )}
    </ul>
  );
};

export default TicketList;
