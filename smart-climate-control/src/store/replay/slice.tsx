import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReplayState } from "./types";

const initialState: ReplayState = {
    light: false,
    pump: false,
    fan: false

  }

export const slice = createSlice({
    name: "replay",
    initialState,
    reducers: {
        setLight: (state, action: PayloadAction<boolean>) => {
            state.light = action.payload
        },
        setPump: (state, action: PayloadAction<boolean>) => {
            state.pump = action.payload
        },
        setFan: (state, action: PayloadAction<boolean>) => {
            state.fan = action.payload
        }
    }
})

export const { setLight, setPump, setFan } = slice.actions

export default slice.reducer;