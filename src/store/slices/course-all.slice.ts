import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseApi } from "../../api/course.api";
import { Pagination } from "../../types/common.types";
import { CoursePagination, GetCourse } from "../../types/course.types";
import { createAppAsyncThunk, GetThunkState, ThunkType } from "../store.types";

interface State {
    courses: GetCourse[];
    currentPage: number;
    pageSize: number;
    nextPage: number | undefined;
    prevPage: number | undefined;
    getCourses: ThunkType;
    subscribe: ThunkType;
    unsubscribe: ThunkType;
    courseId: number | null;
}

const state: State = {
    courses: [],
    currentPage: 1,
    pageSize: 5,
    nextPage: undefined,
    prevPage: undefined,
    getCourses: GetThunkState(),
    subscribe: GetThunkState(),
    unsubscribe: GetThunkState(),
    courseId: null,
};

export const getCourses = createAppAsyncThunk(
    "course-all/get-courses",
    async (data: CoursePagination) => {
        const courses = await CourseApi.getAllCourses(data);

        return { ...courses, add: data.add };
    }
);

export const subscribe = createAppAsyncThunk(
    "courses-all/subscribe",
    async (courseId: number) => {
        await CourseApi.subscribe(courseId);
    }
);

export const unsubscribe = createAppAsyncThunk(
    "courses-all/unsubscribe",
    async (courseId: number) => {
        await CourseApi.unsubscribe(courseId);
    }
);

export const courseAllSlice = createSlice({
    name: "course-all",
    initialState: state,
    reducers: {
        restoreSubscribeThunk(state) {
            state.subscribe.status = "idle";
        },

        restoreUnsubscribeThunk(state) {
            state.unsubscribe.status = "idle";
        },

        setCourseId(state, action: PayloadAction<number | null>) {
            state.courseId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCourses.pending, (state, action) => {
                state.getCourses.status = "pending";
            })
            .addCase(getCourses.fulfilled, (state, action) => {
                state.getCourses.status = "succeeded";

                const { items, nextPage, prevPage, add } = action.payload;

                if (add) {
                    state.courses = [...state.courses, ...items];
                } else {
                    state.courses = items;
                }

                state.nextPage = nextPage;
                state.prevPage = prevPage;
            })
            .addCase(getCourses.rejected, (state, action) => {
                state.getCourses.status = "rejected";
                state.getCourses.error =
                    action.error.message ?? "Unknown Error";
            })

            .addCase(subscribe.pending, (state, action) => {
                state.subscribe.status = "pending";
            })
            .addCase(subscribe.fulfilled, (state, action) => {
                state.subscribe.status = "succeeded";
            })
            .addCase(subscribe.rejected, (state, action) => {
                state.subscribe.status = "rejected";
                state.subscribe.error = action.error.message ?? "Unknown Error";
            })

            .addCase(unsubscribe.pending, (state, action) => {
                state.unsubscribe.status = "pending";
            })
            .addCase(unsubscribe.fulfilled, (state, action) => {
                state.unsubscribe.status = "succeeded";
            })
            .addCase(unsubscribe.rejected, (state, action) => {
                state.unsubscribe.status = "rejected";
                state.unsubscribe.error =
                    action.error.message ?? "Unknown Error";
            });
    },
});

export const { restoreSubscribeThunk, restoreUnsubscribeThunk, setCourseId } =
    courseAllSlice.actions;
