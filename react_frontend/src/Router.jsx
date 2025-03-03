import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import UsersPage from "./Pages/UsersPage";
import UserDetailsPage from "./Pages/UserDetailsPage";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import ProtectedRoute from "./utils/PrivateAuthRoute";
import Unauthorized from "./Pages/Unauthorize";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/users",
        element: (
            <ProtectedRoute roles={["admin"]}>
                <UsersPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/users/:id",
        element: (
            <ProtectedRoute>
                <UserDetailsPage />
            </ProtectedRoute>
        ),
    },
]);
