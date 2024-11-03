import { RouteObject } from "react-router";
import { ProtectedRoute } from "../components/common/ProtectedRoute";
import { ProfilePage } from "../components/User/ProfilePage";
import { ProfileCoursesPage } from "../components/User/ProfileCoursesPage";
import { ProfileUpdatePage } from "../components/User/ProfileUpdatePage";
import { UsersPage } from "../components/User/UsersPage";

export const profileRoutes: RouteObject[] = [
    {
        path: "/users",
        element: <UsersPage />,
    },
    {
        path: "/profile/:userId",
        element: <ProfilePage />,
        children: [
            {
                element: <ProfileCoursesPage />,
                path: "/profile/:userId/courses",
            },
        ],
    },
    {
        path: "/profile",
        element: (
            <ProtectedRoute redirectTo="/auth/sign-in">
                <ProfilePage />
            </ProtectedRoute>
        ),
        children: [
            {
                element: <ProfileCoursesPage />,
                path: "/profile/courses",
            },
            {
                element: <ProfileUpdatePage />,
                path: "/profile/update",
            },
        ],
    },
];
