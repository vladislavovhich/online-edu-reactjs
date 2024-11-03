import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useUserProfile } from "../../hooks/useUserProfile.hook";
import { useDispatch } from "react-redux";
import { getCourses } from "../../store/slices/course-all.slice";
import { WithPrealoader } from "../common/WithPreloader";
import { CourseList } from "./CourseList";

export const CoursesPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { courses, currentPage, nextPage, pageSize } = useSelector(
        (state: RootState) => state.courseAll
    );
    const { user, userAuthorized, isProfileOwner } = useUserProfile();
    const getCoursesThunk = useSelector(
        (state: RootState) => state.courseAll.getCourses
    );
    const loadCoursesFunc = () => {
        if (!nextPage) {
            return;
        }

        dispatch(getCourses({ page: nextPage, pageSize, add: true }));
    };

    useEffect(() => {
        if (courses.length) {
            return;
        }

        dispatch(getCourses({ page: 1, pageSize }));
    }, []);

    return (
        <div className="d-flex flex-column">
            <h3 className="h3 text-darker my-3">Курсы</h3>

            <hr className="mt-0 mb-3" />

            <CourseList
                courses={courses}
                currentUser={userAuthorized}
                currentUserId={user?.id}
                authorizedUserId={userAuthorized?.id}
                loadCoursesFunc={loadCoursesFunc}
                nextPage={nextPage}
                loadStatus={getCoursesThunk.status}
            />
        </div>
    );
};
