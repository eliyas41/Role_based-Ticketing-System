import { Component } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router.jsx";

class App extends Component {
    render() {
        return <RouterProvider router={router} />;
    }
}

export default App;
