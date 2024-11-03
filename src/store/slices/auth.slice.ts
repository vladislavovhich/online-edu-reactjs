import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthApi } from "../../api/auth.api";
import { SignIn, SignUp, User } from "../../types/auth.types";
import { createAppAsyncThunk, GetThunkState, ThunkType } from "../store.types";
import { GetCourse } from "../../types/course.types";

interface Auth {
    signIn: ThunkType;
    signUp: ThunkType;
    signOut: ThunkType;
    authMe: ThunkType;
    email: string;
    password: string;
    name: string;
    surname: string;
    role: string;
    isAuthorized: boolean;
    actionError: string;
    user: User | null;
}

const authState: Auth = {
    signIn: GetThunkState(),
    signUp: GetThunkState(),
    signOut: GetThunkState(),
    authMe: GetThunkState(),
    email: "",
    password: "",
    name: "",
    surname: "",
    role: "STUDENT",
    isAuthorized: false,
    actionError: "",
    user: null,
};

export const signIn = createAppAsyncThunk(
    "auth/auth-sign-in",
    async (data: SignIn) => {
        const result = await AuthApi.signIn(data);

        return result;
    }
);

export const signUp = createAppAsyncThunk(
    "auth/auth-sign-up",
    async (data: SignUp) => {
        const result = await AuthApi.signUp(data);

        return result;
    }
);

export const signOut = createAppAsyncThunk("auth/auth-sign-out", async () => {
    await AuthApi.signOut();
});

export const authMe = createAppAsyncThunk("auth/auth-me", async () => {
    const result = await AuthApi.authMe();

    return result;
});

export const authSlice = createSlice({
    name: "auth",
    initialState: authState,
    reducers: {
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },

        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },

        setName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },

        setSurname(state, action: PayloadAction<string>) {
            state.surname = action.payload;
        },

        setRole(state, action: PayloadAction<string>) {
            state.role = action.payload;
        },

        setSignInError(state, action: PayloadAction<string | null>) {
            state.signIn.error = action.payload;
        },

        setSignUpError(state, action: PayloadAction<string | null>) {
            state.signUp.error = action.payload;
        },

        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },

        addCurrentUserCourse(state, action: PayloadAction<GetCourse>) {
            if (!state.user) {
                return;
            }

            state.user.courses.push(action.payload.id);
        },
        removeCurrentUserCourse(state, action: PayloadAction<GetCourse>) {
            if (!state.user) {
                return;
            }

            state.user.courses = state.user.courses.filter(
                (id) => id != action.payload.id
            );
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state, action) => {
                state.signIn.status = "pending";
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.signIn.status = "succeeded";

                const result = action.payload;

                state.user = result;
                state.isAuthorized = true;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.signIn.status = "rejected";
                state.signIn.error = action.error.message ?? "Unknown Error";
            })

            .addCase(signUp.pending, (state, action) => {
                state.signUp.status = "pending";
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.signUp.status = "succeeded";

                const result = action.payload;

                state.user = result;
                state.isAuthorized = true;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.signUp.status = "rejected";
                state.signUp.error = action.error.message ?? "Unknown Error";
            })

            .addCase(authMe.pending, (state, action) => {
                state.authMe.status = "pending";
            })
            .addCase(authMe.fulfilled, (state, action) => {
                state.authMe.status = "succeeded";

                const result = action.payload;

                state.user = result;
                state.isAuthorized = true;
            })
            .addCase(authMe.rejected, (state, action) => {
                state.authMe.status = "rejected";
                state.authMe.error = action.error.message ?? "Unknown Error";
            })

            .addCase(signOut.pending, (state, action) => {
                state.signOut.status = "pending";
            })
            .addCase(signOut.fulfilled, (state, action) => {
                state.signOut.status = "succeeded";
                state.user = null;
                state.isAuthorized = false;
            })
            .addCase(signOut.rejected, (state, action) => {
                state.signOut.status = "rejected";
                state.signOut.error = action.error.message ?? "Unknown Error";
            });
    },
});

export const {
    setEmail,
    setPassword,
    setName,
    setSurname,
    setRole,
    setSignInError,
    setSignUpError,
    setUser,
    addCurrentUserCourse,
    removeCurrentUserCourse,
} = authSlice.actions;
