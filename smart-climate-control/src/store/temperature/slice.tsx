import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TemperatureState } from "./types";

const initialState: TemperatureState = {
    val: 0,
    vals: []
  }

export const slice = createSlice({
    name: "temperature",
    initialState,
    reducers: {
        setTemperature: (state, action: PayloadAction<number>) => {
            state.val = action.payload
        },
        putTemperatures: (state, action: PayloadAction<number>) => {
            state.vals.push(action.payload)
        }
    }
})

export const { setTemperature, putTemperatures } = slice.actions

export default slice.reducer;