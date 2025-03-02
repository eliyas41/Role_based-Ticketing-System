import { Component } from "react";

class Loader extends Component {
    render() {
        return (
            <div className="h-[100vh] w-full flex items-center justify-center">
                <div className="w-12 h-12 rounded-full animate-spin border-2 border-solid border-indigo-500 border-t-transparent"></div>
            </div>
        );
    }
}

export default Loader;
