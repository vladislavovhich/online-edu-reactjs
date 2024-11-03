import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { restoreDeleteThunk } from "../../store/slices/course-edit.slice";
import {
    getLecture,
    setLecture,
    deleteLecture,
    updateLecture,
    restoreUpdateThunk,
} from "../../store/slices/lecture-edit.slice";
import { AppDispatch, RootState } from "../../store/store";
import { WithPrealoader } from "../common/WithPreloader";
import { LectureEdit } from "./LectureEdit";

export const LectureUpdatePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams<{ courseId: string; lectureId: string }>();
    const courseId = params.courseId ? parseInt(params.courseId) : null;
    const lectureId = params.lectureId ? parseInt(params.lectureId) : null;
    const {
        updateLecture: updateThunk,
        lecture,
        name,
        description,
        subject,
        date,
    } = useSelector((state: RootState) => state.lectureEdit);
    const { lectures } = useSelector((state: RootState) => state.courseFull);

    useEffect(() => {
        if (!lectureId) {
            return;
        }

        const lectureFound = lectures.find(
            (lecture) => lecture.id == lectureId
        );

        if (!lectureFound) {
            dispatch(getLecture(lectureId));

            return;
        }

        dispatch(setLecture(lectureFound));
    }, [lectureId]);

    if (!courseId || !lectureId) {
        return null;
    }

    return (
        <WithPrealoader status={updateThunk.status}>
            <LectureEdit
                navigateTo={`/courses/${courseId}/lectures`}
                type={"update"}
                thunk={updateThunk}
                thunkAction={() =>
                    updateLecture({
                        name,
                        description,
                        subject,
                        id: lectureId,
                        date: new Date(date),
                        courseId,
                    })
                }
                restoreThunk={restoreUpdateThunk}
                text={"Редактирование лекции"}
                buttonText={"Редактировать лекцию"}
                lecture={lecture}
            />
        </WithPrealoader>
    );
};
