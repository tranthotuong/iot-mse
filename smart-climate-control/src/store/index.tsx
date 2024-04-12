import { configureStore } from '@reduxjs/toolkit';
import humidityReducer from "./humidity/slice";
import temperatureReducer from "./temperature/slice";
import replayReducer from "./replay/slice";

export const store = configureStore({
    reducer: {
        humidity: humidityReducer,
        temperature: temperatureReducer,
        replay: replayReducer
    },
  })
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch