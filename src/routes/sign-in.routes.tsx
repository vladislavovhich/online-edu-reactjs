import { RouteObject } from "react-router";
import { SignIn } from "../components/Auth/SignIn";
import { SignUp } from "../components/Auth/SignUp";
import { AuthorizedRedirectTo } from "../components/common/AuthorizedRedirectTo";

export const signInRoutes: RouteObject[] = [
    {
        path: "/auth/sign-in",
        element: (
            <AuthorizedRedirectTo redirectTo="/profile">
                <SignIn />
            </AuthorizedRedirectTo>
        ),
    },
    {
        path: "/auth/sign-up",
        element: (
            <AuthorizedRedirectTo redirectTo="/profile">
                <SignUp />
            </AuthorizedRedirectTo>
        ),
    },
];
