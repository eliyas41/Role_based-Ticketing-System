import { Component, createContext } from "react";
import getAuth from '../utils/auth';  // Assuming this is a utility function to get user data

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

  componentDidMount() {
    // Retrieve the logged in user from local storage
    const loggedInUser = getAuth();
    loggedInUser.then((response) => {
      if (response.user_token) {
        this.setState({
          isLogged: true,
          isAdmin: response.is_admin === 'admin',
          user: response,
        });
      }
    });
  }

  render() {
    const { isLogged, isAdmin, user } = this.state;
    const value = { isLogged, isAdmin, user };

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
