import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth.slice";
import { courseEditSlice } from "./slices/course-edit.slice";
import { courseSlice } from "./slices/course.slice";
import { userProfileSlice } from "./slices/user-profile.slice";
import { courseAllSlice } from "./slices/course-all.slice";
import { courseFullSlice } from "./slices/course-full.slice";
import { lectureEditSlice } from "./slices/lecture-edit.slice";
import { userSlice } from "./slices/user.slice";
import { messageEditSlice } from "./slices/message-edit.slice";
import { groupEditSlice } from "./slices/group-edit.slice";
import { groupSlice } from "./slices/group.slice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        auth: authSlice.reducer,
        courseEdit: courseEditSlice.reducer,
        course: courseSlice.reducer,
        courseAll: courseAllSlice.reducer,
        userProfile: userProfileSlice.reducer,
        courseFull: courseFullSlice.reducer,
        lectureEdit: lectureEditSlice.reducer,
        messageEdit: messageEditSlice.reducer,
        groupEdit: groupEditSlice.reducer,
        group: groupSlice.reducer,
    },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export default store;
