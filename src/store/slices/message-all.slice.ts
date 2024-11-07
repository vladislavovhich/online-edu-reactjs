import { createSlice } from "@reduxjs/toolkit";
import {
    CreateMessage,
    Message,
    MessagePagination,
} from "../../types/message.types";
import { createAppAsyncThunk, GetThunkState, ThunkType } from "../store.types";
import { MessageApi } from "../../api/message.api";

interface State {
    messages: Message[];
    page: number;
    pageSize: number;
    nextPage: number | undefined;
    prevPage: number | undefined;
    getMessages: ThunkType;
    loadMessages: ThunkType;
    sendMessage: ThunkType;
}

const state: State = {
    messages: [],
    page: 1,
    pageSize: 5,
    nextPage: undefined,
    prevPage: undefined,
    getMessages: GetThunkState(),
    loadMessages: GetThunkState(),
    sendMessage: GetThunkState(),
};

export const sendMessage = createAppAsyncThunk(
    "message-all/send-message-thunk",
    async (data: CreateMessage) => {
        const message = await MessageApi.sendMessage(data);

        return message;
    }
);

export const getMessages = createAppAsyncThunk(
    "message-all/get-messages-thunk",
    async (data: MessagePagination) => {
        const messages = await MessageApi.getMessages(data);

        return messages;
    }
);

export const loadMessages = createAppAsyncThunk(
    "message-all/load-messages-thunk",
    async (data: MessagePagination) => {
        const messages = await MessageApi.getMessages(data);

        return messages;
    }
);

export const messageAllSlice = createSlice({
    name: "message-all",
    initialState: state,
    reducers: {
        restoreSendMessageThunk(state) {
            state.sendMessage.status = "idle";
        },
    },
    extraReducers(builder) {
        builder
            .addCase(loadMessages.pending, (state, action) => {
                state.loadMessages.status = "pending";
            })
            .addCase(loadMessages.fulfilled, (state, action) => {
                state.loadMessages.status = "succeeded";

                state.messages = [...state.messages, ...action.payload.items];
                state.nextPage = action.payload.nextPage;
                state.prevPage = action.payload.nextPage;
            })
            .addCase(loadMessages.rejected, (state, action) => {
                state.loadMessages.status = "rejected";
                state.loadMessages.error =
                    action.error.message ?? "Unknown Error";
            })

            .addCase(getMessages.pending, (state, action) => {
                state.getMessages.status = "pending";
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.getMessages.status = "succeeded";

                state.messages = action.payload.items;
                state.nextPage = action.payload.nextPage;
                state.prevPage = action.payload.nextPage;
            })
            .addCase(getMessages.rejected, (state, action) => {
                state.getMessages.status = "rejected";
                state.getMessages.error =
                    action.error.message ?? "Unknown Error";
            })

            .addCase(sendMessage.pending, (state, action) => {
                state.sendMessage.status = "pending";
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.sendMessage.status = "succeeded";

                state.messages = [...state.messages, action.payload];
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.sendMessage.status = "rejected";
                state.sendMessage.error =
                    action.error.message ?? "Unknown Error";
            });
    },
});

export const { restoreSendMessageThunk } = messageAllSlice.actions;
