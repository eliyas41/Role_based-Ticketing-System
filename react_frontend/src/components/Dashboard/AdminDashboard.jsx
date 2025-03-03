import React, { Component } from "react";
import TicketList from "../Tickets/TicketList";
import getAuth from "../../utils/auth";
import { getTickets } from "../../utils/ticketService";
import Loader from "../Loader/Loader";

class AdminDashboard extends Component {
  state = {
    tickets: [],
    isLoading: false,
    error: "",
  };

  async componentDidMount() {
    this.setState({ isLoading: true, error: "" });

    try {
      const loggedInUser = await getAuth();
      if (!loggedInUser || !loggedInUser.user_token || loggedInUser.role !== "admin") {
        throw new Error("Access restricted to admins only");
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
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {error && <p className="text-red-500">{error}</p>}

        <h2 className="text-lg font-semibold mb-2">All Tickets</h2>
        <TicketList tickets={tickets} isAdmin={true} />
      </section>
    );
  }
}

export default AdminDashboard;
