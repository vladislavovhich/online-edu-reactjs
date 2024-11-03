import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    deleteCourse,
    restoreDeleteThunk,
    restoreUpdateThunk,
    updateCourse,
} from "../../store/slices/course-edit.slice";
import { AppDispatch, RootState } from "../../store/store";
import { CourseEdit } from "./CourseEdit";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { getCourse, setCourse } from "../../store/slices/course.slice";

export const CourseDeletePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams<{ courseId: string }>();
    const deleteCourseThunk = useSelector(
        (state: RootState) => state.courseEdit.delete
    );
    const { courses, course } = useSelector((state: RootState) => state.course);
    const courseId = params.courseId ? parseInt(params.courseId) : null;

    useEffect(() => {
        if (courseId) {
            const courseFound = courses.find((course) => course.id == courseId);

            if (courseFound) {
                dispatch(setCourse(courseFound));
                return;
            }

            dispatch(getCourse(courseId));
        }
    }, [courseId]);

    if (!course || !courseId) {
        return null;
    }

    return (
        <CourseEdit
            navigateTo={"/profile/courses"}
            type={"delete"}
            thunk={deleteCourseThunk}
            thunkAction={() => deleteCourse(courseId)}
            restoreThunk={restoreDeleteThunk}
            text={"Удаление курса"}
            buttonText={"Удалить"}
            course={course}
        />
    );
};
