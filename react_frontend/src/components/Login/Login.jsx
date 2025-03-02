import { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isSubmitting: false,
      error: '',
      redirectToDashboard: false,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    // Simulating static data for login
    const users = [
      { email: 'testuser@example.com', password: 'password123', role: 'User' },
      { email: 'admin@example.com', password: 'adminpassword', role: 'Admin' },
    ];

    // Check if the email and password match any user (static data check)
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      this.setState({ redirectToDashboard: true });
    } else {
      this.setState({ error: 'Invalid email or password.', isSubmitting: false });
    }
  };

  render() {
    if (this.state.redirectToDashboard) {
      return <div>Redirecting to Dashboard...</div>;
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Log In
          </h2>
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
              <span className="text-indigo-500 hover:text-indigo-600">
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
