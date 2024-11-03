import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    restoreCreateThunk,
    restoreDeleteThunk,
} from "../../store/slices/course-edit.slice";
import {
    createLecture,
    deleteLecture,
    getLecture,
    setLecture,
} from "../../store/slices/lecture-edit.slice";
import { AppDispatch, RootState } from "../../store/store";
import { LectureEdit } from "./LectureEdit";
import { useDispatch } from "react-redux";
import { WithPrealoader } from "../common/WithPreloader";

export const LectureDeletePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams<{ courseId: string; lectureId: string }>();
    const courseId = params.courseId ? parseInt(params.courseId) : null;
    const lectureId = params.lectureId ? parseInt(params.lectureId) : null;
    const { deleteLecture: deleteLectureThunk, lecture } = useSelector(
        (state: RootState) => state.lectureEdit
    );
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
        <WithPrealoader status={deleteLectureThunk.status}>
            <LectureEdit
                navigateTo={`/courses/${courseId}/lectures`}
                type={"delete"}
                thunk={deleteLectureThunk}
                thunkAction={() => deleteLecture(lectureId)}
                restoreThunk={restoreDeleteThunk}
                text={"Удаление лекции"}
                buttonText={"Удалить лекцию"}
                lecture={lecture}
            />
        </WithPrealoader>
    );
};
