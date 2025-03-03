// components/Dashboard/AdminDashboard.jsx
import React, { Component } from "react";
import TicketList from "../Ticket/TicketList";

class AdminDashboard extends Component {
  render() {
    return (
      <section className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <TicketList isAdmin={true} />
      </section>
    );
  }
}

export default AdminDashboard;
