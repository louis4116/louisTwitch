import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    left: false,
    teach: false,
    deleteId: { userId: "", display: false },
  },
  reducers: {
    toggleLeft: (state, action) => {
      state.left = action.payload;
    },
    toggleTeach: (state, action) => {
      state.teach = action.payload;
    },
    toggleDeleteId: (state, action) => {
      state.deleteId.display = !state.deleteId.display;
    },
  },
});

export const toggleActions = toggleSlice.actions;

export default toggleSlice;
