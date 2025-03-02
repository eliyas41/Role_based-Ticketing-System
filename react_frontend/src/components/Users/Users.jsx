import { Component } from "react";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

export class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    id: 1,
                    name: "John Doe",
                    email: "john.doe@example.com",
                    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
                },
                {
                    id: 2,
                    name: "Jane Smith",
                    email: "jane.smith@example.com",
                    imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
                },
                {
                    id: 3,
                    name: "Bob Johnson",
                    email: "bob.johnson@example.com",
                    imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
                },
                {
                    id: 4,
                    name: "Alice Davis",
                    email: "alice.davis@example.com",
                    imageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
                },
            ],
            isLoading: false,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        // Simulating a delay for loading state, remove the setTimeout if using real API
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 1000);
    }

    render() {
        const { users, isLoading } = this.state;

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

                <ul role="list" className="divide-y divide-gray-100">
                    {users?.map((person) => (
                        <li key={person.email} className="flex justify-between gap-x-6 py-5">
                            {/* User info div */}
                            <div className="flex min-w-0 gap-x-4">
                                <img
                                    alt=""
                                    src={person?.imageUrl}
                                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                />
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                        {person?.name}
                                    </p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                        {person?.email}
                                    </p>
                                </div>
                            </div>

                            {/* Buttons div */}
                            <div className="flex gap-x-4 sm:flex-col sm:gap-2 sm:mt-2 sm:items-end md:flex-row">
                                {/* Details button */}
                                <div className="mt-1 flex items-center gap-x-1.5">
                                    <Link to={`/users/${person?.id}`}>
                                        <button className="text-xs leading-5 bg-gray-50 rounded py-1.5 px-2 hover:bg-gray-200 duration-150 text-gray-500">
                                            Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        );
    }
}

export default Users;
