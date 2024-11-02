import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserApi } from "../../api/user.api";
import { User } from "../../types/auth.types";
import { UserUpdate } from "../../types/user.types";
import { createAppAsyncThunk, GetThunkState, ThunkType } from "../store.types";

interface State {
    user: User | null;
    getUser: ThunkType;
    updateUser: ThunkType;
    name: string;
    surname: string;
    password: string;
    userUpdated: User | null;
}

const state: State = {
    user: null,
    getUser: GetThunkState(),
    updateUser: GetThunkState(),
    name: "",
    surname: "",
    password: "",
    userUpdated: null,
};

export const getUser = createAppAsyncThunk(
    "user-profile/get-user-thunk",
    async (userId: number) => {
        const user = await UserApi.findOne(userId);

        return user;
    }
);

export const updateUser = createAppAsyncThunk(
    "user-profile/update-user-thunk",
    async (data: UserUpdate) => {
        const user = await UserApi.update(data);

        return user;
    }
);

export const userProfileSlice = createSlice({
    name: "user-profile",
    initialState: state,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        setSurname(state, action: PayloadAction<string>) {
            state.surname = action.payload;
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
        setUpdateThunkError(state, action: PayloadAction<string | null>) {
            state.updateUser.error = action.payload;
        },
        restoreUpdateThunk(state) {
            state.updateUser.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state, action) => {
                state.getUser.status = "pending";
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.getUser.status = "succeeded";

                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.getUser.status = "rejected";
                state.getUser.error = action.error.message ?? "Unknown Error";
            })

            .addCase(updateUser.pending, (state, action) => {
                state.updateUser.status = "pending";
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.updateUser.status = "succeeded";

                state.userUpdated = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.updateUser.status = "rejected";
                state.updateUser.error =
                    action.error.message ?? "Unknown Error";
            });
    },
});

export const {
    setName,
    setSurname,
    setPassword,
    setUpdateThunkError,
    restoreUpdateThunk,
} = userProfileSlice.actions;
