import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { routes } from "./routes/routes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { WebSocketProvider } from "./components/common/WebSocketProvider";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

export const router = createBrowserRouter(routes);

root.render(
    <React.StrictMode>
        <WebSocketProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Provider store={store}>
                    <RouterProvider router={router} />
                </Provider>
            </LocalizationProvider>
        </WebSocketProvider>
    </React.StrictMode>
);

reportWebVitals();
