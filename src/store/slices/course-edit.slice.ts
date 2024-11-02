import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseApi } from "../../api/course.api";
import { Course, CourseUpdate } from "../../types/course.types";
import { createAppAsyncThunk, GetThunkState, ThunkType } from "../store.types";

interface State {
    create: ThunkType;
    update: ThunkType;
    delete: ThunkType;
    name: string;
    description: string;
    message: string;
}

const state: State = {
    create: GetThunkState(),
    update: GetThunkState(),
    delete: GetThunkState(),
    name: "",
    description: "",
    message: "",
};

export const createCourse = createAppAsyncThunk(
    "course-edit/create-thunk",
    async (data: Course) => {
        const course = await CourseApi.create(data);

        return course;
    }
);

export const updateCourse = createAppAsyncThunk(
    "course-edit/update-thunk",
    async (data: CourseUpdate) => {
        const course = await CourseApi.update(data);

        return course;
    }
);

export const deleteCourse = createAppAsyncThunk(
    "course-edit/delete-thunk",
    async (courseId: number) => {
        const message = await CourseApi.delete(courseId);

        return message;
    }
);

export const courseEditSlice = createSlice({
    name: "course-edit",
    initialState: state,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },

        setDescription(state, action: PayloadAction<string>) {
            state.description = action.payload;
        },

        restoreCreateThunk(state) {
            state.create.status = "idle";
        },

        restoreDeleteThunk(state) {
            state.delete.status = "idle";
        },

        restoreUpdateThunk(state) {
            state.update.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCourse.pending, (state, action) => {
                state.create.status = "pending";
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.create.status = "succeeded";
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.create.status = "rejected";
                state.create.error = action.error.message ?? "Unknown Error";
            })

            .addCase(updateCourse.pending, (state, action) => {
                state.update.status = "pending";
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                state.update.status = "succeeded";
            })
            .addCase(updateCourse.rejected, (state, action) => {
                state.update.status = "rejected";
                state.update.error = action.error.message ?? "Unknown Error";
            })

            .addCase(deleteCourse.pending, (state, action) => {
                state.delete.status = "pending";
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.delete.status = "succeeded";

                state.message = action.payload;
            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.delete.status = "rejected";
                state.delete.error = action.error.message ?? "Unknown Error";
            });
    },
});

export const {
    setName,
    setDescription,
    restoreDeleteThunk,
    restoreCreateThunk,
    restoreUpdateThunk,
} = courseEditSlice.actions;
