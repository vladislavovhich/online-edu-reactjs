import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses, loadCourses } from "../../store/slices/course.slice";
import { AppDispatch, RootState } from "../../store/store";
import { CourseList } from "../Course/CourseList";
import { Link, Navigate, useParams } from "react-router-dom";
import { WithPrealoader } from "../common/WithPreloader";
import { useUserProfile } from "../../hooks/useUserProfile.hook";

export const ProfileCoursesPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, userAuthorized, isProfileOwner, userId } = useUserProfile();
    const { courses, nextPage, pageSize } = useSelector(
        (state: RootState) => state.course
    );
    const getCoursesThunk = useSelector(
        (state: RootState) => state.course.getCourses
    );
    const loadCoursesThunk = useSelector(
        (state: RootState) => state.course.loadCourses
    );

    const loadCoursesFunc = () => {
        if (!nextPage || !user) {
            return;
        }

        dispatch(loadCourses({ page: nextPage, pageSize, userId: user.id }));
    };

    useEffect(() => {
        if (!user) {
            return;
        }

        dispatch(getCourses(user.id));
    }, [userId]);

    if (!user) {
        return null;
    }

    return (
        <div className="d-flex flex-column">
            <h3 className="h3 text-darker my-3">Курсы</h3>

            <hr className="mt-0 mb-3" />

            {userAuthorized &&
                userAuthorized.role == "MENTOR" &&
                user.id == userAuthorized.id && (
                    <Link to="/courses/create" className="btn-darker">
                        Добавить курс
                    </Link>
                )}

            <WithPrealoader status={getCoursesThunk.status}>
                <CourseList
                    courses={courses}
                    currentUserId={user.id}
                    authorizedUserId={userAuthorized?.id}
                    loadCoursesFunc={loadCoursesFunc}
                    nextPage={nextPage}
                    loadStatus={loadCoursesThunk.status}
                    currentUser={userAuthorized}
                />
            </WithPrealoader>
        </div>
    );
};
