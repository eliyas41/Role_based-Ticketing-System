import React, { Component } from "react";
import { Table, Tag, Spin, Alert, Input } from "antd";
import TicketActions from "../Ticket/TicketActions";
import getAuth from "../../utils/auth";
import { getTickets } from "../../utils/ticketService";

class TicketList extends Component {
  state = {
    tickets: [],
    isLoading: false,
    error: "",
    searchText: "",
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

  handleSearch = (e) => {
    this.setState({ searchText: e.target.value });
  };

  render() {
    const { tickets, isLoading, error, searchText } = this.state;
    const { isAdmin } = this.props;

    // Filter tickets based on search input
    const filteredTickets = tickets.filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(searchText.toLowerCase()) ||
        ticket.user.email.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
      {
        title: "Full Name",
        dataIndex: ["user", "fullname"],
        key: "fullname",
        responsive: ["md"], // Hides on small screens
      },
      {
        title: "Email",
        dataIndex: ["user", "email"],
        key: "email",
      },
      {
        title: "Ticket Title",
        dataIndex: "title",
        key: "title",
        responsive: ["md"]
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        responsive: ["md"], // Hides on small screens
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => (
          <Tag color={
            status === "Open" ? "green" :
              status === "In Progress" ? "yellow" :
                "volcano"
          }>{status}</Tag>

        ),
      },
    ];

    if (isAdmin) {
      columns.push({
        title: "Actions",
        key: "actions",
        render: (text, ticket) => (
          <TicketActions
            ticket={ticket}
            onStatusChange={this.handleStatusChange}
          />
        ),
      });
    }

    return (
      <div className="p-4 bg-white rounded shadow">
        {error && <Alert message="Error" description={error} type="error" showIcon />}

        <Input
          placeholder="Search by title or email..."
          allowClear
          onChange={this.handleSearch}
          style={{ marginBottom: 16, width: "50%" }}
        />

        {isLoading ? (
          <Spin tip="Loading Tickets..." className="flex justify-center" />
        ) : (
          <Table
            columns={columns}
            dataSource={filteredTickets}
            rowKey="_id"
            bordered
            pagination={{ pageSize: 5 }}
          />
        )}
      </div>
    );
  }
}

export default TicketList;
