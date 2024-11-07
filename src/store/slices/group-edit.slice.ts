import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupApi } from "../../api/group.api";
import { CreateGroup, Group, UpdateGroup } from "../../types/group.types";
import { createAppAsyncThunk, GetThunkState, ThunkType } from "../store.types";

interface State {
    group: Group | null;
    name: string;
    description: string;
    findOne: ThunkType;
    create: ThunkType;
    update: ThunkType;
    delete: ThunkType;
}

const state: State = {
    group: null,
    name: "",
    description: "",
    findOne: GetThunkState(),
    create: GetThunkState(),
    update: GetThunkState(),
    delete: GetThunkState(),
};

export const findOneGroup = createAppAsyncThunk(
    "group-edit/find-one-group-thunk",
    async (groupId: number) => {
        const group = await GroupApi.findOne(groupId);

        return group;
    }
);

export const createGroup = createAppAsyncThunk(
    "group-edit/create-group-thunk",
    async (data: CreateGroup) => {
        const group = await GroupApi.create(data);

        return group;
    }
);

export const updateGroup = createAppAsyncThunk(
    "group-edit/update-group-thunk",
    async (data: UpdateGroup) => {
        const group = await GroupApi.update(data);

        return group;
    }
);

export const deleteGroup = createAppAsyncThunk(
    "group-edit/delete-group-thunk",
    async (groupId: number) => {
        await GroupApi.delete(groupId);
    }
);

export const groupEditSlice = createSlice({
    name: "group-edit",
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
            .addCase(findOneGroup.pending, (state, action) => {
                state.findOne.status = "pending";
            })
            .addCase(findOneGroup.fulfilled, (state, action) => {
                state.findOne.status = "succeeded";

                state.group = action.payload;
                state.name = action.payload.name;
                state.description = action.payload.description;
            })
            .addCase(findOneGroup.rejected, (state, action) => {
                state.findOne.status = "rejected";
                state.findOne.error = action.error.message ?? "Unknown Error";
            })

            .addCase(createGroup.pending, (state, action) => {
                state.create.status = "pending";
            })
            .addCase(createGroup.fulfilled, (state, action) => {
                state.create.status = "succeeded";

                state.group = action.payload;
            })
            .addCase(createGroup.rejected, (state, action) => {
                state.create.status = "rejected";
                state.create.error = action.error.message ?? "Unknown Error";
            })

            .addCase(updateGroup.pending, (state, action) => {
                state.update.status = "pending";
            })
            .addCase(updateGroup.fulfilled, (state, action) => {
                state.update.status = "succeeded";

                state.group = action.payload;
            })
            .addCase(updateGroup.rejected, (state, action) => {
                state.update.status = "rejected";
                state.update.error = action.error.message ?? "Unknown Error";
            })

            .addCase(deleteGroup.pending, (state, action) => {
                state.delete.status = "pending";
            })
            .addCase(deleteGroup.fulfilled, (state, action) => {
                state.delete.status = "succeeded";
            })
            .addCase(deleteGroup.rejected, (state, action) => {
                state.delete.status = "rejected";
                state.delete.error = action.error.message ?? "Unknown Error";
            });
    },
});

export const {
    setName,
    setDescription,
    restoreCreateThunk,
    restoreDeleteThunk,
    restoreUpdateThunk,
} = groupEditSlice.actions;
