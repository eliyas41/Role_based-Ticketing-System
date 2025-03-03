import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import UsersPage from "./Pages/UsersPage";
import UserDetailsPage from "./Pages/UserDetailsPage";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import ProtectedRoute from "./utils/PrivateAuthRoute";
import Unauthorized from "./Pages/Unauthorize";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import UserDashboard from "./components/Dashboard/UserDashboard";

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
            <ProtectedRoute roles={["admin", "user"]}>
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
    {
        path: "/admin-dashboard",
        element: (
            <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/user-dashboard",
        element: (
            <ProtectedRoute roles={["user"]}>
                <UserDashboard />
            </ProtectedRoute>
        ),
    },
]);
