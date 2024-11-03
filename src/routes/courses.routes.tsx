import { RouteObject } from "react-router";
import { ProtectedRoute } from "../components/common/ProtectedRoute";
import { CourseCreatePage } from "../components/Course/CourseCreatePage";
import { CourseDeletePage } from "../components/Course/CourseDeletePage";
import { CoursesPage } from "../components/Course/CoursesPage";
import { CourseUpdatePage } from "../components/Course/CourseUpdatePage";
import { CoursePage } from "../components/Course/CoursePage";
import { CourseSettingsPage } from "../components/Course/CourseSettingsPage";
import { CourseLecturesPage } from "../components/Course/CourseLecturesPage";
import { LectureCreatePage } from "../components/Lecture/LectureCreatePage";
import { LectureUpdatePage } from "../components/Lecture/LectureUpdatePage";
import { LectureDeletePage } from "../components/Lecture/LectureDeletePage";

export const courseRoutes: RouteObject[] = [
    {
        path: "/courses/:courseId/add-lecture",
        element: <LectureCreatePage />,
    },
    {
        path: "/courses/:courseId/update-lecture/:lectureId",
        element: <LectureUpdatePage />,
    },
    {
        path: "/courses/:courseId/delete-lecture/:lectureId",
        element: <LectureDeletePage />,
    },
    {
        path: "/courses/:courseId",
        element: <CoursePage />,
        children: [
            {
                path: "/courses/:courseId/settings",
                element: <CourseSettingsPage />,
            },
            {
                path: "/courses/:courseId/lectures",
                element: <CourseLecturesPage />,
            },
        ],
    },
    {
        path: "/courses",
        element: <CoursesPage />,
    },
    {
        path: "/courses/create",
        element: (
            <ProtectedRoute redirectTo="/auth/sign-in">
                <CourseCreatePage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/courses/:courseId/update",
        element: (
            <ProtectedRoute redirectTo="/auth/sign-in">
                <CourseUpdatePage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/courses/:courseId/delete",
        element: (
            <ProtectedRoute redirectTo="/auth/sign-in">
                <CourseDeletePage />
            </ProtectedRoute>
        ),
    },
];
