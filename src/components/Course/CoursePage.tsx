import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { getCourse } from "../../store/slices/course-full.slice";
import { WithPrealoader } from "../common/WithPreloader";
import { CourseTopBar } from "./CourseTopBar";
import { useUserProfile } from "../../hooks/useUserProfile.hook";
import { CourseInfo } from "./CourseInfo";
import { CourseNavBar } from "./CourseNavBar";

export const CoursePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { course, getCourse: getCourseThunk } = useSelector(
        (state: RootState) => state.courseFull
    );
    const params = useParams<{ courseId: string }>();
    const courseId = params.courseId ? parseInt(params.courseId) : null;
    const { userAuthorized } = useUserProfile();

    const canEditCourse =
        !!userAuthorized && userAuthorized.id == course?.mentor.id;

    useEffect(() => {
        if (!courseId) {
            return;
        }

        dispatch(getCourse(courseId));
    }, [courseId]);

    if (!course) {
        return null;
    }

    return (
        <WithPrealoader status={getCourseThunk.status}>
            <div className="d-flex flex-column">
                <CourseTopBar
                    mentor={course.mentor}
                    canEditCourses={canEditCourse}
                    courseId={course.id}
                    currentUser={userAuthorized}
                    showSettings={false}
                />

                <hr className="my-2" />

                <CourseInfo
                    name={course.name}
                    description={course.description}
                    addSeparator={false}
                />

                <hr className="my-2" />

                <CourseNavBar
                    courseId={course.id}
                    user={userAuthorized}
                    mentorId={course.mentor.id}
                />

                <hr className="my-2" />

                <div>
                    <Outlet />
                </div>
            </div>
        </WithPrealoader>
    );
};
