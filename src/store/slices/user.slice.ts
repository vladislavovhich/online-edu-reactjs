import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/auth.types";
import { createAppAsyncThunk, GetThunkState, ThunkType } from "../store.types";
import { Pagination, UserCoursesPagination } from "../../types/common.types";
import { UserApi } from "../../api/user.api";
import { LectureUsersPagination } from "../../types/course.types";

interface State {
    users: User[];
    currentPage: number;
    pageSize: number;
    nextPage: number | undefined;
    prevPage: number | undefined;

    courseUsers: User[];
    currentPageCourse: number;
    pageSizeCourse: number;
    nextPageCourse: number | undefined;
    prevPageCourse: number | undefined;

    getUsers: ThunkType;
    getCourseUsers: ThunkType;

    loadUsers: ThunkType;
    loadCourseUsers: ThunkType;
}

const state: State = {
    users: [],
    courseUsers: [],
    currentPage: 1,
    pageSize: 5,
    nextPage: undefined,
    prevPage: undefined,

    currentPageCourse: 1,
    pageSizeCourse: 5,
    nextPageCourse: undefined,
    prevPageCourse: undefined,

    getUsers: GetThunkState(),
    getCourseUsers: GetThunkState(),

    loadUsers: GetThunkState(),
    loadCourseUsers: GetThunkState(),
};

export const getUsers = createAppAsyncThunk(
    "user/get-users",
    async (data: Pagination) => {
        const users = await UserApi.findMany(data);

        return users;
    }
);

export const loadUsers = createAppAsyncThunk(
    "user/load-users",
    async (data: Pagination) => {
        const users = await UserApi.findMany(data);

        return users;
    }
);

export const getCourseStudents = createAppAsyncThunk(
    "user/get-course-users",
    async (data: LectureUsersPagination) => {
        const users = await UserApi.findCourseStudents(data);

        return users;
    }
);

export const loadCourseStudents = createAppAsyncThunk(
    "user/load-course-users",
    async (data: LectureUsersPagination) => {
        const users = await UserApi.findCourseStudents(data);

        return users;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState: state,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state, action) => {
                state.getUsers.status = "pending";
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.getUsers.status = "succeeded";

                state.users = action.payload.items;
                state.nextPage = action.payload.nextPage;
                state.prevPage = action.payload.nextPage;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.getUsers.status = "rejected";
                state.getUsers.error = action.error.message ?? "Unknown Error";
            })

            .addCase(loadUsers.pending, (state, action) => {
                state.loadUsers.status = "pending";
            })
            .addCase(loadUsers.fulfilled, (state, action) => {
                state.loadUsers.status = "succeeded";

                state.users = [...state.users, ...action.payload.items];
                state.nextPage = action.payload.nextPage;
                state.prevPage = action.payload.nextPage;
            })
            .addCase(loadUsers.rejected, (state, action) => {
                state.loadUsers.status = "rejected";
                state.loadUsers.error = action.error.message ?? "Unknown Error";
            })

            .addCase(getCourseStudents.pending, (state, action) => {
                state.getCourseUsers.status = "pending";
            })
            .addCase(getCourseStudents.fulfilled, (state, action) => {
                state.getCourseUsers.status = "succeeded";

                state.courseUsers = action.payload.items;
                state.nextPageCourse = action.payload.nextPage;
                state.prevPageCourse = action.payload.nextPage;
            })
            .addCase(getCourseStudents.rejected, (state, action) => {
                state.getCourseUsers.status = "rejected";
                state.getCourseUsers.error =
                    action.error.message ?? "Unknown Error";
            })

            .addCase(loadCourseStudents.pending, (state, action) => {
                state.loadCourseUsers.status = "pending";
            })
            .addCase(loadCourseStudents.fulfilled, (state, action) => {
                state.loadCourseUsers.status = "succeeded";

                state.courseUsers = [
                    ...state.courseUsers,
                    ...action.payload.items,
                ];
                state.nextPageCourse = action.payload.nextPage;
                state.prevPageCourse = action.payload.nextPage;
            })
            .addCase(loadCourseStudents.rejected, (state, action) => {
                state.loadCourseUsers.status = "rejected";
                state.loadCourseUsers.error =
                    action.error.message ?? "Unknown Error";
            });
    },
});
