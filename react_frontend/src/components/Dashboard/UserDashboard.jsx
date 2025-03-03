import React, { Component } from "react";
import TicketForm from "../Tickets/TicketForm";
import TicketList from "../Tickets/TicketList";
import getAuth from "../../utils/auth";
import { getTickets } from "../../utils/ticketService";

class UserDashboard extends Component {
  state = {
    tickets: [],
    isLoading: false,
    error: "",
  };

  async componentDidMount() {
    this.setState({ isLoading: true, error: "" });

    try {
      const loggedInUser = await getAuth();
      if (!loggedInUser || !loggedInUser.user_token) {
        throw new Error("Invalid/Expired token, please login again");
      }

      const { user_token: token } = loggedInUser;
      const tickets = await getTickets(token);

      this.setState({ tickets, isLoading: false });
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  }

  render() {
    const { tickets, isLoading, error } = this.state;

    if (isLoading) return <Loader />;

    return (
      <section className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Your Dashboard</h1>
        {error && <p className="text-red-500">{error}</p>}

        <TicketForm />

        <h2 className="text-lg font-semibold mb-2">Your Tickets</h2>
        <TicketList tickets={tickets} />
      </section>
    );
  }
}

export default UserDashboard;
