import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk, GetThunkState, ThunkType } from "../store.types";
import {
    Lecture,
    LectureCreate,
    LectureUpdate,
} from "../../types/lecture.types";
import { LectureApi } from "../../api/lecture.api";

interface State {
    name: string;
    description: string;
    subject: string;
    date: number;
    createLecture: ThunkType;
    deleteLecture: ThunkType;
    updateLecture: ThunkType;
    onlineLecture: ThunkType;
    offlineLecture: ThunkType;
    getLecture: ThunkType;
    lecture: Lecture | null;
}

const state: State = {
    lecture: null,
    name: "",
    description: "",
    subject: "",
    date: Date.now(),
    createLecture: GetThunkState(),
    updateLecture: GetThunkState(),
    deleteLecture: GetThunkState(),
    getLecture: GetThunkState(),
    onlineLecture: GetThunkState(),
    offlineLecture: GetThunkState(),
};

export const createLecture = createAppAsyncThunk(
    "lecture-edit/create-lecture-thunk",
    async (data: LectureCreate) => {
        const lecture = await LectureApi.create(data);

        return lecture;
    }
);

export const updateLecture = createAppAsyncThunk(
    "lecture-edit/update-lecture-thunk",
    async (data: LectureUpdate) => {
        const lecture = await LectureApi.update(data);

        return lecture;
    }
);

export const deleteLecture = createAppAsyncThunk(
    "lecture-edit/delete-lecture-thunk",
    async (lectureId: number) => {
        console.log("sd");
        await LectureApi.delete(lectureId);

        return;
    }
);

export const onlineLecture = createAppAsyncThunk(
    "lecture-edit/online-lecture-thunk",
    async (lectureId: number) => {
        await LectureApi.online(lectureId);

        return;
    }
);

export const offlineLecture = createAppAsyncThunk(
    "lecture-edit/offline-lecture-thunk",
    async (lectureId: number) => {
        await LectureApi.offline(lectureId);

        return;
    }
);

export const getLecture = createAppAsyncThunk(
    "lecture-edit/get-lecture-thunk",
    async (lectureId: number) => {
        const lecture = await LectureApi.findOne(lectureId);

        return lecture;
    }
);

export const lectureEditSlice = createSlice({
    name: "lecture-edit",
    initialState: state,
    reducers: {
        setLecture(state, action: PayloadAction<Lecture>) {
            state.lecture = action.payload;
            state.name = state.lecture.name;
            state.subject = state.lecture.subject;
            state.date = +new Date(state.lecture.date);
            state.description = state.lecture.description;
        },

        setName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },

        setDescription(state, action: PayloadAction<string>) {
            state.description = action.payload;
        },

        setSubject(state, action: PayloadAction<string>) {
            state.subject = action.payload;
        },

        setDate(state, action: PayloadAction<number>) {
            state.date = action.payload;
        },

        restoreCreateThunk(state) {
            state.createLecture.status = "idle";
        },

        restoreDeleteThunk(state) {
            state.deleteLecture.status = "idle";
        },

        restoreUpdateThunk(state) {
            state.updateLecture.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(onlineLecture.pending, (state, action) => {
                state.onlineLecture.status = "pending";
            })
            .addCase(onlineLecture.fulfilled, (state, action) => {
                state.onlineLecture.status = "succeeded";

                console.log(action.payload);
            })
            .addCase(onlineLecture.rejected, (state, action) => {
                state.onlineLecture.status = "rejected";
                state.onlineLecture.error =
                    action.error.message ?? "Unknown Error";
            })

            .addCase(offlineLecture.pending, (state, action) => {
                state.offlineLecture.status = "pending";
            })
            .addCase(offlineLecture.fulfilled, (state, action) => {
                state.offlineLecture.status = "succeeded";

                console.log(action.payload);
            })
            .addCase(offlineLecture.rejected, (state, action) => {
                state.offlineLecture.status = "rejected";
                state.offlineLecture.error =
                    action.error.message ?? "Unknown Error";
            })

            .addCase(createLecture.pending, (state, action) => {
                state.createLecture.status = "pending";
            })
            .addCase(createLecture.fulfilled, (state, action) => {
                state.createLecture.status = "succeeded";

                console.log(action.payload);
            })
            .addCase(createLecture.rejected, (state, action) => {
                state.createLecture.status = "rejected";
                state.createLecture.error =
                    action.error.message ?? "Unknown Error";
            })

            .addCase(updateLecture.pending, (state, action) => {
                state.updateLecture.status = "pending";
            })
            .addCase(updateLecture.fulfilled, (state, action) => {
                state.updateLecture.status = "succeeded";

                console.log(action.payload);
            })
            .addCase(updateLecture.rejected, (state, action) => {
                state.updateLecture.status = "rejected";
                state.updateLecture.error =
                    action.error.message ?? "Unknown Error";
            })

            .addCase(deleteLecture.pending, (state, action) => {
                state.deleteLecture.status = "pending";
            })
            .addCase(deleteLecture.fulfilled, (state, action) => {
                state.deleteLecture.status = "succeeded";
            })
            .addCase(deleteLecture.rejected, (state, action) => {
                state.deleteLecture.status = "rejected";
                state.deleteLecture.error =
                    action.error.message ?? "Unknown Error";
            })

            .addCase(getLecture.pending, (state, action) => {
                state.getLecture.status = "pending";
            })
            .addCase(getLecture.fulfilled, (state, action) => {
                state.getLecture.status = "succeeded";

                state.lecture = action.payload;
                state.name = state.lecture.name;
                state.subject = state.lecture.subject;
                state.date = +new Date(state.lecture.date);
                state.description = state.lecture.description;
            })
            .addCase(getLecture.rejected, (state, action) => {
                state.getLecture.status = "rejected";
                state.getLecture.error =
                    action.error.message ?? "Unknown Error";
            });
    },
});

export const {
    setName,
    setDescription,
    setSubject,
    setDate,
    restoreCreateThunk,
    restoreDeleteThunk,
    restoreUpdateThunk,
    setLecture,
} = lectureEditSlice.actions;
