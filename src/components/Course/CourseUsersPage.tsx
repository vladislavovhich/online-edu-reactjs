import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    getCourseStudents,
    loadCourseStudents,
} from "../../store/slices/user.slice";
import { WithPrealoader } from "../common/WithPreloader";
import { UserList } from "../User/UserList";

export const CourseUsersPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        courseUsers,
        getCourseUsers: getCourseUsersThunk,
        loadCourseUsers: loadCourseUsersThunk,
        pageSizeCourse,
        nextPage,
    } = useSelector((state: RootState) => state.user);
    const params = useParams<{ courseId: string }>();
    const courseId = params.courseId ? parseInt(params.courseId) : null;
    const loadCoursesFunc = () => {
        if (!nextPage || !courseId) {
            return;
        }

        dispatch(
            loadCourseStudents({
                courseId,
                page: nextPage,
                pageSize: pageSizeCourse,
            })
        );
    };
    useEffect(() => {
        if (!courseId) {
            return;
        }

        dispatch(
            getCourseStudents({ courseId, page: 1, pageSize: pageSizeCourse })
        );
    }, [courseId]);

    if (!courseId) {
        return null;
    }

    return (
        <WithPrealoader status={getCourseUsersThunk.status}>
            <UserList
                users={courseUsers}
                hasNextPage={!!nextPage}
                loadUsers={loadCoursesFunc}
                status={loadCourseUsersThunk.status}
            />
        </WithPrealoader>
    );
};
