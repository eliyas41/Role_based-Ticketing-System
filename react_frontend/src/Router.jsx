import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
// import UsersPage from "./Pages/UsersPage";
// import UserDetailsPage from "./Pages/UserDetailsPage";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/signUp";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    // {
    //     path: "/users",
    //     element: <UsersPage />,
    // },
    // {
    //     path: "/users/:id",
    //     element: <UserDetailsPage />,
    // },
]);
