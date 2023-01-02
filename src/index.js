import { StrictMode } from "react";
import ReactDOM from "react-dom";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import App from "./App";
import ErrorPage from "./routes/error-page";
import SuccessPage from "./routes/success";
import FailPage from "./routes/fail";
import LandingPage from "./routes/landing";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    },
    {
        path: "/landing",
        element: <LandingPage />,
    },
    {
        path: "/seats",
        element: <App />,
    },
    {
        path: "/stats/:seatId",
        element: <App />,
    },
    {
        path: "/success",
        element: <SuccessPage />,
    },
    {
        path: "/fail",
        element: <FailPage />,
    }

]);

const rootElement = document.getElementById("root");
ReactDOM.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
    rootElement
);
