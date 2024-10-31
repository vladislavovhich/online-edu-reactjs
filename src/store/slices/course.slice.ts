import { createSlice } from "@reduxjs/toolkit";
import { CourseApi } from "../../api/course.api";
import { GetCourse } from "../../types/course.types";
import { createAppAsyncThunk, GetThunkState, ThunkType } from "../store.types";

interface State {
    courses: GetCourse[]
    currentPage: number
    nextPage: number | undefined
    prevPage: number | undefined
    getCourses: ThunkType
}

const state: State = {
    courses: [],
    currentPage: 1,
    nextPage: undefined,
    prevPage: undefined,
    getCourses: GetThunkState()
}

export const getCourses = createAppAsyncThunk(
    'course/get-mentor-courses',
    async (userId: number) => {
        const courses = await CourseApi.getCourses(userId)

        return courses
    }
)

export const courseSlice = createSlice({
    name: "course",
    initialState: state,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getCourses.pending, (state, action) => {
                state.getCourses.status = 'pending'
            })
            .addCase(getCourses.fulfilled, (state, action) => {
                state.getCourses.status = 'succeeded'

                state.courses = action.payload.items
                state.nextPage = action.payload.nextPage 
                state.prevPage = action.payload.nextPage 
            })
            .addCase(getCourses.rejected, (state, action) => {
                state.getCourses.status = 'rejected'
                state.getCourses.error = action.error.message ?? 'Unknown Error'
            })
    }
})