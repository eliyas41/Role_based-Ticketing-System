import { Component } from "react";
import { Navigate } from "react-router";
import getAuth from "../utils/auth";

class PrivateAuthRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      isLogged: false,
      isAuthorized: false,
    };
  }

  async componentDidMount() {
    try {
      const { roles } = this.props;
      console.log(roles)

      // Retrieve the logged-in user from local storage
      const loggedInUser = await getAuth();
      console.log(loggedInUser);

      if (loggedInUser.user_token) {
        // If the user is logged in
        this.setState({ isLogged: true });

        if (roles && roles.length > 0 && roles.includes(loggedInUser.role)) {
          // If the user has the right role
          this.setState({ isAuthorized: true });
        }
      }

      // Mark the checking process as complete
      this.setState({ isChecked: true });
    } catch (error) {
      console.error("Error fetching authentication:", error);
    }
  }

  render() {
    const { isChecked, isLogged, isAuthorized } = this.state;
    const { children } = this.props;

    // Wait until the authentication check is completed
    if (!isChecked) {
      return <div>Loading...</div>;
    }

    // If the user is not logged in, redirect to the login page
    if (!isLogged) {
      return <Navigate to="/login" />;
    }

    // If the user is not authorized, redirect to the unauthorized page
    if (!isAuthorized) {
      return <Navigate to="/unauthorized" />;
    }

    // Otherwise, render the children components (protected route content)
    return children;
  }
}

export default PrivateAuthRoute;
