import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
]);
