import { Component } from 'react';
import { Link } from 'react-router-dom';

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { id: 1, name: 'John Doe', email: 'johndoe@example.com', role: 'User' },
        { id: 2, name: 'Admin User', email: 'admin@example.com', role: 'Admin' },
      ],
    };
  }

  render() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-3xl font-semibold mb-8">Users List</h2>

        <ul className="w-full max-w-3xl px-4 py-8 bg-white shadow-md rounded-md">
          {this.state.users.map((user) => (
            <li key={user.id} className="flex justify-between items-center py-4 border-b">
              <div>
                <p className="font-semibold text-lg text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <Link
                to={`/users/${user.id}`}
                className="text-indigo-500 hover:text-indigo-700 text-sm"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UsersList;
