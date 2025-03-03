import React, { Component } from "react";
import TicketActions from "./TicketActions";

class TicketItem extends Component {
  render() {
    const { ticket, isAdmin } = this.props;
    console.log(ticket)

    return (
      <li className="p-4 bg-white rounded shadow mb-2">
        <h3 className="font-semibold text-gray-800">{ticket.title}</h3>
        <p className="text-gray-600">{ticket.description}</p>
        <span className="text-sm text-gray-500">Status: {ticket.status}</span>
        {isAdmin && <TicketActions ticket={ticket} />}
      </li>
    );
  }
}

export default TicketItem;
