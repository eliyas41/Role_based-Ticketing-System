import { Component } from "react";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import getAuth from "../../utils/auth";
import { getTickets, createTicket, updateTicketStatus } from "../ticketService"; // Create service for API calls

const api_url = import.meta.env.VITE_API_URL;

class Users extends Component {
    state = {
        tickets: [],
        title: "",
        description: "",
        isLoading: false,
        error: "",
        userRole: "", // To store the user role
    };

    async componentDidMount() {
        this.setState({ isLoading: true, error: "" });

        try {
            const loggedInUser = await getAuth();
            if (!loggedInUser || !loggedInUser.user_token) {
                throw new Error("Invalid/Expired token, please login again");
            }

            const { user_token: token, role } = loggedInUser;
            const tickets = await getTickets(token);

            this.setState({ tickets, isLoading: false, userRole: role }); // Save the user role
        } catch (error) {
            this.setState({ error: error.message, isLoading: false });
        }
    }

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

        this.setState({ isLoading: true, error: "" });

        try {
            const loggedInUser = await getAuth();
            const { user_token: token } = loggedInUser;

            const newTicket = await createTicket(token, { title, description });

            this.setState((prevState) => ({
                tickets: [...prevState.tickets, newTicket],
                title: "",
                description: "",
                isLoading: false,
            }));
        } catch (error) {
            this.setState({ error: error.message, isLoading: false });
        }
    };

    handleStatusUpdate = async (ticketId, newStatus) => {
        const { userRole } = this.state;
        if (userRole !== "admin") {
            alert("You are not authorized to update the ticket status.");
            return;
        }

        try {
            const loggedInUser = await getAuth();
            const { user_token: token } = loggedInUser;

            // Call the updateTicketStatus function from the service
            const updatedTicket = await updateTicketStatus(token, ticketId, newStatus);

            this.setState((prevState) => ({
                tickets: prevState.tickets.map(ticket =>
                    ticket._id === updatedTicket._id ? updatedTicket : ticket
                ),
            }));
        } catch (error) {
            console.error("Error updating ticket status:", error.message);
            this.setState({ error: error.message });
        }
    };

    render() {
        const { tickets, title, description, isLoading, error, userRole } = this.state;

        if (isLoading) return <Loader />;

        return (
            <section className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
                {error && <p className="text-red-500">{error}</p>}

                {/* Ticket Form */}
                <form onSubmit={this.handleSubmit} className="bg-gray-100 p-4 rounded mb-6">
                    <h2 className="text-lg font-semibold mb-2">Create a New Ticket</h2>
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
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                </form>

                {/* Ticket List */}
                <h2 className="text-lg font-semibold mb-2">
                    {userRole === "admin" ? "List of Tickets" : "Your Tickets"}
                </h2>
                {tickets.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {tickets.map((ticket) => (
                            <li key={ticket._id} className="p-4 bg-white rounded shadow mb-2">
                                <h3 className="font-semibold text-gray-800">{ticket.title}</h3>
                                <p className="text-gray-600">{ticket.description}</p>
                                <span className="text-sm text-gray-500">Status: {ticket.status}</span>

                                {/* Only admins can see this button */}
                                {userRole === "admin" && (
                                    <div className="mt-2">
                                        <button
                                            onClick={() => this.handleStatusUpdate(ticket._id, "Open")}
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                        >
                                            Mark as Open
                                        </button>
                                        <button
                                            onClick={() => this.handleStatusUpdate(ticket._id, "In Progress")}
                                            className="bg-yellow-500 text-white px-4 py-2 rounded ml-2"
                                        >
                                            Mark as In Progress
                                        </button>
                                        <button
                                            onClick={() => this.handleStatusUpdate(ticket._id, "Closed")}
                                            className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                                        >
                                            Mark as Closed
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No tickets found.</p>
                )}
            </section>
        );
    }
}

export default Users;
