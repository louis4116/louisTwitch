import { createSlice, current } from "@reduxjs/toolkit";

const twitchDataSlice = createSlice({
  name: "twitchData",
  initialState: {
    twitchData: [],
    twitchSmall: [],
    indexOf: "",
  },
  reducers: {
    storeData: (state, action) => {
      const items = action.payload;
      state.twitchData = items;
    },
    removeData: (state, action) => {
      const { userId } = action.payload;
      state.twitchData = state.twitchData.filter(
        (item) => item.user_id !== userId
      );
    },
    moveData: (state, action) => {
      const { draggedIndex, hoverIndex } = action.payload;
      const [draggedItem] = state.twitchData.splice(draggedIndex, 1);
      state.twitchData.splice(hoverIndex, 0, draggedItem);
    },
    storeSmall: (state, action) => {
      const items = action.payload;
      if (!items) return;
      const value = items[0];
      const findExist = state.twitchSmall?.find((item) => item.id === value.id);
      if (findExist) return;
      state.twitchSmall.push(value);
    },
  },
});

export const twitchDataActions = twitchDataSlice.actions;

export default twitchDataSlice;
