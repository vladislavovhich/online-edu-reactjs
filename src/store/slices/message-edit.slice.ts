import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
    text: string;
}

const state: State = {
    text: "",
};

export const messageEditSlice = createSlice({
    name: "message-edit",
    initialState: state,
    reducers: {
        setText(state, action: PayloadAction<string>) {
            state.text = action.payload;
        },
    },
});

export const { setText } = messageEditSlice.actions;
