import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: "",
    userId: JSON.parse(localStorage.getItem("userId")) || [],
  },
  reducers: {
    storeId: (state, action) => {
      const items = action.payload;
      // console.log(items);
      state.token = items;
    },
    storeUserId: (state, action) => {
      const { userId } = action.payload;
      // console.log(userId);
      if (!userId) return;
      const findExitId = state.userId.find((item) => item === userId);
      if (findExitId) return;
      state.userId.push(userId);
      localStorage.setItem(
        "userId",
        JSON.stringify(state.userId.map((item) => item))
      );
    },
  },
});

export const storeIdActions = tokenSlice.actions;

export default tokenSlice;
