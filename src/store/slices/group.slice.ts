import { createSlice } from "@reduxjs/toolkit";
import { GroupApi } from "../../api/group.api";
import { Group, GroupPagination, MemberGroupOp } from "../../types/group.types";
import { createAppAsyncThunk, GetThunkState, ThunkType } from "../store.types";

interface State {
    groups: Group[];
    currentPage: number;
    pageSize: number;
    nextPage: number | undefined;
    prevPage: number | undefined;
    getGroups: ThunkType;
    loadGroups: ThunkType;
    addMember: ThunkType;
    removeMember: ThunkType;
}

const state: State = {
    groups: [],
    currentPage: 1,
    pageSize: 5,
    nextPage: undefined,
    prevPage: undefined,
    getGroups: GetThunkState(),
    loadGroups: GetThunkState(),
    addMember: GetThunkState(),
    removeMember: GetThunkState(),
};

export const addMember = createAppAsyncThunk(
    "group/add-member-thunk",
    async (data: MemberGroupOp) => {
        await GroupApi.addMember(data);
    }
);

export const removeMember = createAppAsyncThunk(
    "group/remove-member-thunk",
    async (data: MemberGroupOp) => {
        await GroupApi.removeMember(data);
    }
);

export const getGroups = createAppAsyncThunk(
    "group/get-groups-thunk",
    async (data: GroupPagination) => {
        const groups = await GroupApi.getGroups(data);

        return groups;
    }
);

export const loadGroups = createAppAsyncThunk(
    "group/load-groups-thunk",
    async (data: GroupPagination) => {
        const groups = await GroupApi.getGroups(data);

        return groups;
    }
);

export const groupSlice = createSlice({
    name: "group",
    initialState: state,
    reducers: {
        restoreAddMemberThunk(state) {
            state.addMember.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addMember.pending, (state, action) => {
                state.addMember.status = "pending";
            })
            .addCase(addMember.fulfilled, (state, action) => {
                state.addMember.status = "succeeded";
            })
            .addCase(addMember.rejected, (state, action) => {
                state.addMember.status = "rejected";
                state.addMember.error = action.error.message ?? "Unknown Error";
            })

            .addCase(removeMember.pending, (state, action) => {
                state.removeMember.status = "pending";
            })
            .addCase(removeMember.fulfilled, (state, action) => {
                state.removeMember.status = "succeeded";
            })
            .addCase(removeMember.rejected, (state, action) => {
                state.removeMember.status = "rejected";
                state.removeMember.error =
                    action.error.message ?? "Unknown Error";
            })

            .addCase(getGroups.pending, (state, action) => {
                state.getGroups.status = "pending";
            })
            .addCase(getGroups.fulfilled, (state, action) => {
                state.getGroups.status = "succeeded";

                state.groups = action.payload.items;
                state.nextPage = action.payload.nextPage;
                state.prevPage = action.payload.nextPage;
            })
            .addCase(getGroups.rejected, (state, action) => {
                state.getGroups.status = "rejected";
                state.getGroups.error = action.error.message ?? "Unknown Error";
            })

            .addCase(loadGroups.pending, (state, action) => {
                state.loadGroups.status = "pending";
            })
            .addCase(loadGroups.fulfilled, (state, action) => {
                state.loadGroups.status = "succeeded";

                state.groups = [...state.groups, ...action.payload.items];
                state.nextPage = action.payload.nextPage;
                state.prevPage = action.payload.nextPage;
            })
            .addCase(loadGroups.rejected, (state, action) => {
                state.loadGroups.status = "rejected";
                state.loadGroups.error =
                    action.error.message ?? "Unknown Error";
            });
    },
});

export const { restoreAddMemberThunk } = groupSlice.actions;
