import { Action, configureStore, createAsyncThunk, ThunkAction } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth.slice'
import { courseEditSlice } from './slices/course-edit.slice'
import { courseSlice } from './slices/course.slice'

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        courseEdit: courseEditSlice.reducer,
        course: courseSlice.reducer
    },
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export default store