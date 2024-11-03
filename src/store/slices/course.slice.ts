import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseApi } from "../../api/course.api";
import { Course, GetCourse } from "../../types/course.types";
import { createAppAsyncThunk, GetThunkState, ThunkType } from "../store.types";
import { UserCoursesPagination } from "../../types/common.types";

interface State {
    courses: GetCourse[];
    course: GetCourse | null;
    currentPage: number;
    pageSize: number;
    nextPage: number | undefined;
    prevPage: number | undefined;
    getCourses: ThunkType;
    getCourse: ThunkType;
    loadCourses: ThunkType;
}

const state: State = {
    courses: [],
    course: null,
    currentPage: 1,
    pageSize: 5,
    nextPage: undefined,
    prevPage: undefined,
    getCourses: GetThunkState(),
    getCourse: GetThunkState(),
    loadCourses: GetThunkState(),
};

export const getCourses = createAppAsyncThunk(
    "course/get-courses",
    async (userId: number) => {
        const courses = await CourseApi.getCourses(userId);

        return courses;
    }
);

export const getCourse = createAppAsyncThunk(
    "course/get-course",
    async (courseId: number) => {
        const course = await CourseApi.findOne(courseId);

        return course;
    }
);

export const loadCourses = createAppAsyncThunk(
    "course/load-courses",
    async (data: UserCoursesPagination) => {
        const courses = await CourseApi.loadCourses(data);

        return courses;
    }
);

export const courseSlice = createSlice({
    name: "course",
    initialState: state,
    reducers: {
        setCourse(state, action: PayloadAction<GetCourse>) {
            state.course = action.payload;
        },
        addCourse(state, action: PayloadAction<GetCourse>) {
            state.courses.push(action.payload);
        },
        removeCourse(state, action: PayloadAction<GetCourse>) {
            state.courses = state.courses.filter(
                (course) => course.id != action.payload.id
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCourses.pending, (state, action) => {
                state.getCourses.status = "pending";
            })
            .addCase(getCourses.fulfilled, (state, action) => {
                state.getCourses.status = "succeeded";

                state.courses = action.payload.items;
                state.nextPage = action.payload.nextPage;
                state.prevPage = action.payload.nextPage;
            })
            .addCase(getCourses.rejected, (state, action) => {
                state.getCourses.status = "rejected";
                state.getCourses.error =
                    action.error.message ?? "Unknown Error";
            })

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

            .addCase(loadCourses.pending, (state, action) => {
                state.loadCourses.status = "pending";
            })
            .addCase(loadCourses.fulfilled, (state, action) => {
                state.loadCourses.status = "succeeded";

                state.courses = [...state.courses, ...action.payload.items];
                state.nextPage = action.payload.nextPage;
                state.prevPage = action.payload.nextPage;
            })
            .addCase(loadCourses.rejected, (state, action) => {
                state.loadCourses.status = "rejected";
                state.loadCourses.error =
                    action.error.message ?? "Unknown Error";
            });
    },
});

export const { setCourse, addCourse, removeCourse } = courseSlice.actions;
