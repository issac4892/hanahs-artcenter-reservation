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
import SeatPage from "./routes/seats"
import CancelPage from "./routes/cancel";
import ConfirmPage from "./routes/confirm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "landing",
                element: <LandingPage />,
            },
            {
                path: "seats",
                element: <SeatPage />,
            },
            {
                path: "confirm/:seatId",
                element: <ConfirmPage />,
            },
            {
                path: "success",
                element: <SuccessPage />,
            },
            {
                path: "fail",
                element: <FailPage />,
            },
            {
                path: "/ancel",
                element: <CancelPage />
            }
        ]
    },
]);

const rootElement = document.getElementById("root");
ReactDOM.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
    rootElement
);
