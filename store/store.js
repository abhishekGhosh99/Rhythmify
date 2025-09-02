import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./slices/playerSlice";
import searchReducer from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    search: searchReducer,
  },
});
