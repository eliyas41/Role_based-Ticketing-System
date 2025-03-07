import { Component, createContext } from "react";
//his is a utility function to get user data
import getAuth from '../utils/auth';

// Create a context object  
const AuthContext = createContext();

// Create a higher-order component to provide the context to children
export class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      isAdmin: false,
      user: null,
    };
  }

  componentDidMount = async () => {
    try {
      // Retrieve the logged-in user from local storage using await
      const loggedInUser = await getAuth();
      // console.log(loggedInUser);

      if (loggedInUser.user_token) {
        this.setState({
          isLogged: true,
          isAdmin: loggedInUser.role === 'admin',
          user: loggedInUser.role === 'user',
        });
      }
    } catch (error) {
      console.error("Error fetching authentication:", error);
    }
  };


  render() {
    const { isLogged, isAdmin, user } = this.state;
    const value = { isLogged, isAdmin, user };
    // console.log(value)

    return (
      <AuthContext.Provider value={value}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

// To access context value in class components, we will create a helper method
export const withAuth = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {(context) => <WrappedComponent {...this.props} auth={context} />}
        </AuthContext.Consumer>
      );
    }
  };
};
