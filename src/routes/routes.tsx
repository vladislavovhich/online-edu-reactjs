import { RouteObject } from "react-router";
import { App } from "../components/App";
import { signInRoutes } from "./sign-in.routes";
import { profileRoutes } from "./profile.routes";
import { courseRoutes } from "./courses.routes";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [...signInRoutes, ...profileRoutes, ...courseRoutes],
    },
];
