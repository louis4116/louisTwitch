import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import tokenSlice from "./token";
import toggleSlice from "./toggle";
import twitchDataSlice from "./twitchData";
import positionSlice from "./position";
import { twitchApi } from "../api/TwitchAPI";

const store = configureStore({
  reducer: {
    [twitchApi.reducerPath]: twitchApi.reducer,
    tokenResult: tokenSlice.reducer,
    twitchResult: twitchDataSlice.reducer,
    toggleResult: toggleSlice.reducer,
    positionResult: positionSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(twitchApi.middleware),
});

export default store;
