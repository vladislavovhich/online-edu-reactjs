import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    restoreUpdateThunk,
    updateCourse,
} from "../../store/slices/course-edit.slice";
import { AppDispatch, RootState } from "../../store/store";
import { CourseEdit } from "./CourseEdit";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { getCourse, setCourse } from "../../store/slices/course.slice";

export const CourseUpdatePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams<{ courseId: string }>();
    const updateCourseThunk = useSelector(
        (state: RootState) => state.courseEdit.update
    );
    const { courses, course } = useSelector((state: RootState) => state.course);
    const { name, description } = useSelector(
        (state: RootState) => state.courseEdit
    );
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
            type={"update"}
            thunk={updateCourseThunk}
            thunkAction={() => updateCourse({ name, description, courseId })}
            restoreThunk={restoreUpdateThunk}
            text={"Изменение курса"}
            buttonText={"Изменить"}
            course={course}
        />
    );
};
