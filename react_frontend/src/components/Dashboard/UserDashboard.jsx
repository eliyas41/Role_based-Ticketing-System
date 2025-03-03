import React, { Component } from "react";
import TicketForm from "../Ticket/TicketForm";
import TicketList from "../Ticket/TicketList";

class UserDashboard extends Component {
  render() {
    return (
      <section className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <TicketForm />
        <TicketList />
      </section>
    );
  }
}

export default UserDashboard;
