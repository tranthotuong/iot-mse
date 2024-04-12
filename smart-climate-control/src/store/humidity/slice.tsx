import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HumidityState } from "./types";

const initialState: HumidityState = {
    val: 0,
    vals: []
  }

export const slice = createSlice({
    name: "humidity",
    initialState,
    reducers: {
        setHumidity: (state, action: PayloadAction<number>) => {
            state.val += action.payload
        },
        putHumidity: (state, action: PayloadAction<number>) => {
            state.vals.push(action.payload)
        }
    }
})

export const { setHumidity, putHumidity } = slice.actions

export default slice.reducer;