import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    left: false,
    teach: false,
  },
  reducers: {
    toggleLeft: (state, action) => {
      state.left = action.payload;
    },
    toggleTeach: (state, action) => {
      state.teach = action.payload;
    },
  },
});

export const toggleActions = toggleSlice.actions;

export default toggleSlice;
