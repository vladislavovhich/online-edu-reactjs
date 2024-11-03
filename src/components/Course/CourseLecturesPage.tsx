import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { LecturesPage } from "../Lecture/LecturesPage";
import { useDispatch } from "react-redux";
import { getCourse } from "../../store/slices/course-full.slice";
import { WithPrealoader } from "../common/WithPreloader";

export const CourseLecturesPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams<{ courseId: string }>();
    const courseId = params.courseId ? parseInt(params.courseId) : null;
    const { user } = useSelector((state: RootState) => state.auth);
    const { course, getCourse: getCourseThunk } = useSelector(
        (state: RootState) => state.courseFull
    );

    useEffect(() => {
        if (!course) {
            return;
        }

        if (!!courseId && course.id != courseId) {
            dispatch(getCourse(courseId));
        }
    }, [courseId]);

    if (!courseId || !course) {
        return null;
    }

    return (
        <WithPrealoader status={getCourseThunk.status}>
            <LecturesPage
                course={course}
                user={user}
                courseMentorId={course.mentor.id}
            />
        </WithPrealoader>
    );
};
