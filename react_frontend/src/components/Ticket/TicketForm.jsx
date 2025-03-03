import React, { Component } from "react";
import { createTicket } from "../../utils/ticketService";
import getAuth from "../../utils/auth";

class TicketForm extends Component {
  state = {
    title: "",
    description: "",
    isLoading: false,
    error: "",
    successMessage: "",
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = this.state;

    if (!title || !description) {
      this.setState({ error: "Title and description are required." });
      return;
    }

    this.setState({ isLoading: true, error: "", successMessage: "" });

    try {
      const loggedInUser = await getAuth();
      const { user_token: token } = loggedInUser;

      const newTicket = await createTicket(token, { title, description });

      this.setState({
        title: "",
        description: "",
        isLoading: false,
        successMessage: "Ticket created successfully!"
      });

      setTimeout(() => {
        this.setState({ successMessage: "" });
      }, 3000);
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  };

  render() {
    const { title, description, error, successMessage } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="bg-gray-100 p-4 rounded mb-6">
        <h2 className="text-lg font-semibold mb-2">Create a New Ticket</h2>
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && (
          <p className="text-green-500">{successMessage}</p> // Success message display
        )}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={this.handleInputChange}
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={this.handleInputChange}
          className="w-full p-2 border rounded mb-2"
        ></textarea>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {this.state.isLoading ? "Creating..." : "Create"}
        </button>
      </form>
    );
  }
}

export default TicketForm;
