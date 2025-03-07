import React, { Component } from "react";
import { Table, Tag, Spin, Alert, Input, Button } from "antd";
import TicketActions from "../Ticket/TicketActions";
import getAuth from "../../utils/auth";
import { getTickets } from "../../utils/ticketService";

class TicketList extends Component {
  state = {
    tickets: [],
    isLoading: false,
    error: "",
    searchText: "",
    expandedDescription: {} // Track which description is expanded
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

  toggleDescription = (ticketId) => {
    this.setState((prevState) => ({
      expandedDescription: {
        ...prevState.expandedDescription,
        [ticketId]: !prevState.expandedDescription[ticketId]
      }
    }));
  };

  render() {
    const { tickets, isLoading, error, searchText, expandedDescription } = this.state;
    const { isAdmin } = this.props;

    const filteredTickets = tickets.filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(searchText.toLowerCase()) ||
        ticket.user.email.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
      {
        title: "Email",
        dataIndex: ["user", "email"],
        key: "email",
      },
      {
        title: "Ticket Title",
        dataIndex: "title",
        key: "title",
        render: (text) => (
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: 100,
            }}
          >
            {text}
          </div>
        ),
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        render: (text, record) => {
          const isExpanded = expandedDescription[record._id];
          const displayedText = isExpanded ? text : text.slice(0, 100); // Truncate to 100 characters

          return (
            <div>
              <div
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 200,
                }}
              >
                {displayedText}
              </div>
              {text.length > 100 && (
                <Button
                  type="link"
                  onClick={() => this.toggleDescription(record._id)}
                >
                  {isExpanded ? "See Less" : "See More"}
                </Button>
              )}
            </div>
          );
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => (
          <Tag
            color={
              status === "Open" ? "green" :
                status === "In Progress" ? "yellow" :
                  "volcano"
            }
          >
            {status}
          </Tag>
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
      <div className="p-4 bg-white rounded shadow md:overflow-x-hidden">
        {error && <Alert message="Error" description={error} type="error" showIcon />}

        <Input
          placeholder="Search by title or email..."
          allowClear
          onChange={this.handleSearch}
          style={{ marginBottom: 16, maxWidth: "100%" }}
        />

        {isLoading ? (
          <div className="flex justify-center">
            <Spin tip="Loading Tickets..." />
          </div>
        ) : (
          <div className="overflow-x-auto md:overflow-x-hidden">
            <Table
              columns={columns}
              dataSource={filteredTickets}
              rowKey="_id"
              bordered
              pagination={{ pageSize: 5 }}
              scroll={{ x: "max-content" }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default TicketList;
