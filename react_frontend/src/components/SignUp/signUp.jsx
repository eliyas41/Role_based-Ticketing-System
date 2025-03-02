import { Component } from 'react';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      password: '',
      role: 'User', // Default role
      isSubmitting: false,
      redirectToLogin: false,
      error: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, password, role } = this.state;

    // Using static data for simulating a successful registration
    const users = [
      { email: 'testuser@example.com', role: 'User' },
      { email: 'admin@example.com', role: 'Admin' },
    ];

    // Simulate successful registration (static data check)
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      this.setState({ error: 'Email is already taken!', isSubmitting: false });
    } else {
      this.setState({ redirectToLogin: true });
    }
  };

  render() {
    if (this.state.redirectToLogin) {
      return <div>Redirecting to Login...</div>;
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Sign Up
          </h2>
          {this.state.error && (
            <p className="text-red-500 text-center mb-4">{this.state.error}</p>
          )}
          <form onSubmit={this.handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={this.state.fullName}
                onChange={this.handleInputChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your full name"
                required
              />
            </div>

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

            {/* Role Selection */}
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={this.state.role}
                onChange={this.handleInputChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={this.state.isSubmitting}
              className="w-full p-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {this.state.isSubmitting ? 'Registering...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <span className="text-indigo-500 hover:text-indigo-600">
                Log In
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
