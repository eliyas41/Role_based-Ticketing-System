import { Component } from "react";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

// Import API URL from environment variables
const api_url = import.meta.env.VITE_API_URL;

export class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: false,
            error: "",
        };
    }

    async componentDidMount() {
        this.setState({ isLoading: true, error: "" });

        try {
            const response = await fetch(`${api_url}/api/v1/users`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to load users");
            }

            this.setState({ users: data.users, isLoading: false });
        } catch (error) {
            this.setState({ error: error.message, isLoading: false });
        }
    }

    render() {
        const { users, isLoading, error } = this.state;

        if (isLoading) {
            return <Loader />;
        }

        return (
            <section className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <Link to="/">
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-1 px-4 rounded">
                        Home
                    </button>
                </Link>
                <h1 className="text-2xl py-3">Users List</h1>

                {error && <p className="text-red-500">{error}</p>}

                <ul role="list" className="divide-y divide-gray-100">
                    {users.length > 0 ? (
                        users.map((person) => (
                            <li key={person.email} className="flex justify-between gap-x-6 py-5">
                                {/* User info div */}
                                <div className="flex min-w-0 gap-x-4">
                                    <img
                                        alt={person.name}
                                        src={person.imageUrl || "https://via.placeholder.com/50"}
                                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                    />
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                                    </div>
                                </div>

                                {/* Buttons div */}
                                <div className="flex gap-x-4 sm:flex-col sm:gap-2 sm:mt-2 sm:items-end md:flex-row">
                                    <div className="mt-1 flex items-center gap-x-1.5">
                                        <Link to={`/users/${person.id}`}>
                                            <button className="text-xs leading-5 bg-gray-50 rounded py-1.5 px-2 hover:bg-gray-200 duration-150 text-gray-500">
                                                Details
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No users found.</p>
                    )}
                </ul>
            </section>
        );
    }
}

export default Users;
