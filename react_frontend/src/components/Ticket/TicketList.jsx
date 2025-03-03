import React, { Component } from "react";
import TicketItem from "./TicketItem";
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

  render() {
    const { tickets, isLoading, error } = this.state;
    const { isAdmin } = this.props;

    if (isLoading) return <div>Loading...</div>;

    return (
      <div>
        {error && <p className="text-red-500">{error}</p>}
        <ul className="divide-y divide-gray-200">
          {tickets.map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket} isAdmin={isAdmin} />
          ))}
        </ul>
      </div>
    );
  }
}

export default TicketList;
