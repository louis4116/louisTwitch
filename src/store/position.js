import { createSlice, current } from "@reduxjs/toolkit";

const positionSlice = createSlice({
  name: "position",
  initialState: [],
  reducers: {
    storedPosition: (state, action) => {
      const item = action.payload;
      if (item.length === 0) return;
      state.push(item);
    },
    cleanPosition: (state, action) => {
      state.length = 0;
    },
  },
});

export const positionActions = positionSlice.actions;

export default positionSlice;
