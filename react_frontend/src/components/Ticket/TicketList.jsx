import React, { Component } from "react";
import TicketActions from "../Ticket/TicketActions"; // You can import this if needed
import getAuth from "../../utils/auth";
import { getTickets } from "../../utils/ticketService";

class TicketList extends Component {
  state = {
    tickets: [],
    isLoading: false,
    error: "",
  };

  async componentDidMount() {
    this.setState({ isLoading: true, error: "" });

    try {
      const loggedInUser = await getAuth();
      const { user_token: token } = loggedInUser;
      const tickets = await getTickets(token);

      this.setState({ tickets, isLoading: false });
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  }

  handleStatusChange = (ticketId, newStatus) => {
    this.setState((prevState) => ({
      tickets: prevState.tickets.map((ticket) =>
        ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
      ),
    }));
  };

  render() {
    const { tickets, isLoading, error } = this.state;
    const { isAdmin } = this.props;

    if (isLoading) return <div>Loading...</div>;

    return (
      <div className="overflow-x-auto">
        {error && <p className="text-red-500">{error}</p>}
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Ticket Title</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Status</th>
              {isAdmin && <th className="px-4 py-2 border">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{ticket.title}</td>
                <td className="px-4 py-2 border">{ticket.description}</td>
                <td className="px-4 py-2 border">
                  {ticket.status}
                </td>
                {isAdmin && (
                  <td className="px-4 py-2 border">
                    <TicketActions
                      ticket={ticket}
                      onStatusChange={this.handleStatusChange}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TicketList;
