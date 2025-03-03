import { Component } from 'react';
import { Navigate } from 'react-router-dom';

// Import API URL from environment variables
const api_url = import.meta.env.VITE_API_URL;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isSubmitting: false,
      error: '',
      redirectTo: null, // Store redirection path
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isSubmitting: true, error: '' });

    const { email, password } = this.state;

    try {
      const response = await fetch(`${api_url}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      // console.log(data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store user info in localStorage if needed
      localStorage.setItem('user', JSON.stringify(data.sendBack));

      // Determine redirection path based on user role
      const userRole = data.userFound.role;
      const redirectTo = userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard';

      this.setState({ redirectTo }); // Set redirection path

    } catch (error) {
      this.setState({ error: error.message, isSubmitting: false });
    }
  };

  render() {
    // Redirect if a valid route is set
    if (this.state.redirectTo) {
      return <Navigate to={this.state.redirectTo} />;
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Log In</h2>

          {this.state.error && (
            <p className="text-red-500 text-center mb-4">{this.state.error}</p>
          )}

          <form onSubmit={this.handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={this.state.isSubmitting}
              className="w-full p-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {this.state.isSubmitting ? 'Logging In...' : 'Log In'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Do not have an account?{' '}
              <span className="text-indigo-500 hover:text-indigo-600">Sign Up</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
