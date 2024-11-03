import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk, GetThunkState, ThunkType } from "../store.types";
import { CourseApi } from "../../api/course.api";
import { GetCourse } from "../../types/course.types";
import { LectureApi } from "../../api/lecture.api";
import { Lecture } from "../../types/lecture.types";

interface State {
    course: GetCourse | null;
    lectures: Lecture[];
    getCourse: ThunkType;
    getLectures: ThunkType;
}

const state: State = {
    course: null,
    lectures: [],
    getCourse: GetThunkState(),
    getLectures: GetThunkState(),
};

export const getCourse = createAppAsyncThunk(
    "course/get-course",
    async (courseId: number) => {
        const course = await CourseApi.findOne(courseId);

        return course;
    }
);

export const getLectures = createAppAsyncThunk(
    "course/get-lectures-thunk",
    async (courseId: number) => {
        const lectures = await LectureApi.getLectures(courseId);

        return lectures;
    }
);

export const courseFullSlice = createSlice({
    name: "course-full",
    initialState: state,
    reducers: {
        setCourse(state, action: PayloadAction<GetCourse>) {
            state.course = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getCourse.pending, (state, action) => {
                state.getCourse.status = "pending";
            })
            .addCase(getCourse.fulfilled, (state, action) => {
                state.getCourse.status = "succeeded";

                state.course = action.payload;
            })
            .addCase(getCourse.rejected, (state, action) => {
                state.getCourse.status = "rejected";
                state.getCourse.error = action.error.message ?? "Unknown Error";
            })

            .addCase(getLectures.pending, (state, action) => {
                state.getLectures.status = "pending";
            })
            .addCase(getLectures.fulfilled, (state, action) => {
                state.getLectures.status = "succeeded";

                state.lectures = action.payload;
            })
            .addCase(getLectures.rejected, (state, action) => {
                state.getLectures.status = "rejected";
                state.getLectures.error =
                    action.error.message ?? "Unknown Error";
            });
    },
});

export const { setCourse } = courseFullSlice.actions;
