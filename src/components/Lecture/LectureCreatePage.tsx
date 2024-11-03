import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { LectureEdit } from "./LectureEdit";
import { AsyncThunkAction, UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import {
    createLecture,
    restoreCreateThunk,
} from "../../store/slices/lecture-edit.slice";

export const LectureCreatePage = () => {
    const params = useParams<{ courseId: string }>();
    const courseId = params.courseId ? parseInt(params.courseId) : null;
    const {
        name,
        description,
        subject,
        date,
        createLecture: createLectureThunk,
    } = useSelector((state: RootState) => state.lectureEdit);

    if (!courseId) {
        return null;
    }

    return (
        <LectureEdit
            navigateTo={`/courses/${courseId}/lectures`}
            type={"create"}
            thunk={createLectureThunk}
            thunkAction={() =>
                createLecture({
                    name,
                    description,
                    subject,
                    date: new Date(date),
                    courseId,
                })
            }
            restoreThunk={restoreCreateThunk}
            text={"Создание лекции"}
            buttonText={"Добавить лекцию"}
            lecture={null}
        />
    );
};
