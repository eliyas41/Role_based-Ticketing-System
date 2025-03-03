import React, { Component } from "react";
import TicketList from "../Ticket/TicketList";
import { FaUserCircle } from "react-icons/fa";
import getAuth from "../../utils/auth";
import { Navigate } from 'react-router-dom';

class AdminDashboard extends Component {
  state = {
    role: "",
    isDropdownOpen: false,
    logout: false,
  };

  async componentDidMount() {
    try {
      const user = await getAuth(); // Get user data
      this.setState({ role: user.role, isLoading: false }); // Set role from auth
    } catch (error) {
      console.error("Error fetching user role:", error);
      this.setState({ role: "User", isLoading: false }); // Default to "User"
    }
  }

  handleLogout = () => {
    localStorage.removeItem("user");
    this.setState({ logout: true });
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  };

  render() {
    const { role, isDropdownOpen, logout } = this.state;
    if (logout) {
      return <Navigate to="/" replace />;
    }

    return (
      <section className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-16 relative">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>

          {/* Account Circle with Clickable Dropdown */}
          <div className="relative">
            <button onClick={this.toggleDropdown} className="flex items-center gap-2">
              <FaUserCircle className="text-3xl text-gray-700 cursor-pointer" />
              <span className="text-lg font-medium text-gray-800 capitalize">{role}</span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden z-50">
                <button
                  onClick={this.handleLogout}
                  className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <TicketList isAdmin={true} />
      </section>
    );
  }
}

export default AdminDashboard;


