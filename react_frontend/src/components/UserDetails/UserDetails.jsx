import { Component } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

export class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            isLoading: false,
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;  // Accessing the id via props.match.params in class components
        this.setState({ isLoading: true });

        axios
            .get(`http://127.0.0.1:8000/users/${id}`)
            .then((response) => {
                this.setState({ user: response.data, isLoading: false });
            })
            .catch((error) => {
                console.error(error);
                this.setState({ isLoading: false });
            });
    }

    render() {
        const { user, isLoading } = this.state;

        if (isLoading) {
            return <Loader />;
        }

        return (
            <div className="max-w-2xl sm:mx-auto py-5">
                <Link to="/users">
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-1 px-4 rounded">
                        Go Back
                    </button>
                </Link>
                <div className="px-4 pt-5 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                        User Information
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                        Personal details
                    </p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Full name
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {user?.name}
                            </dd>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {user?.email}
                            </dd>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                About
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                Fugiat ipsum ipsum deserunt culpa aute sint do
                                nostrud anim incididunt cillum culpa consequat.
                                Excepteur qui ipsum aliquip consequat sint. Sit id
                                mollit nulla mollit nostrud in ea officia proident.
                                Irure nostrud pariatur mollit ad adipisicing
                                reprehenderit deserunt qui eu.
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        );
    }
}

export default UserDetails;
