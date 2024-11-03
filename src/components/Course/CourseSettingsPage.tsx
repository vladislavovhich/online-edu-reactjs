import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { CourseEdit } from "./CourseEdit";
import { useParams } from "react-router-dom";
import { getCourse, setCourse } from "../../store/slices/course.slice";
import { setCourse as setFullCourse } from "../../store/slices/course-full.slice";
import { useDispatch } from "react-redux";
import {
    restoreUpdateThunk,
    updateCourse,
} from "../../store/slices/course-edit.slice";

export const CourseSettingsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        name,
        description,
        update: updateCourseThunk,
    } = useSelector((state: RootState) => state.courseEdit);
    const { course } = useSelector((state: RootState) => state.courseFull);
    const params = useParams<{ courseId: string }>();
    const courseId = params.courseId ? parseInt(params.courseId) : null;

    useEffect(() => {
        if (!courseId) {
            return;
        }

        if (!course) {
            dispatch(getCourse(courseId));
            return;
        }

        dispatch(setCourse(course));
    }, [courseId]);

    useEffect(() => {
        if (updateCourseThunk.status == "succeeded" && course) {
            dispatch(setFullCourse({ ...course, name, description }));
        }
    }, [updateCourseThunk.status]);

    if (!courseId) {
        return null;
    }

    return (
        <CourseEdit
            navigateTo={`/courses/${courseId}`}
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
