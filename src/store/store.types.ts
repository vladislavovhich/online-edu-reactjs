import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from "./store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{ state: RootState, dispatch: AppDispatch }>()

type thunkStatusType = 'idle' | 'pending' | 'succeeded' | 'rejected'

export interface ThunkType {
  status: thunkStatusType,
  error: string | null
}

export const GetThunkState = () => ({
  status: "idle" as thunkStatusType,
  error: null
})