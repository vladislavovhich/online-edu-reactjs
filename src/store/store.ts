import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth.slice";
import { courseEditSlice } from "./slices/course-edit.slice";
import { courseSlice } from "./slices/course.slice";
import { userProfileSlice } from "./slices/user-profile.slice";
import { courseAllSlice } from "./slices/course-all.slice";
import { courseFullSlice } from "./slices/course-full.slice";
import { lectureEditSlice } from "./slices/lecture-edit.slice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        courseEdit: courseEditSlice.reducer,
        course: courseSlice.reducer,
        courseAll: courseAllSlice.reducer,
        userProfile: userProfileSlice.reducer,
        courseFull: courseFullSlice.reducer,
        lectureEdit: lectureEditSlice.reducer,
    },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export default store;
