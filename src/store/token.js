import { createSlice, current } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: "",
    userId: JSON.parse(localStorage.getItem("userId")) || [],
  },
  reducers: {
    storeId: (state, action) => {
      const items = action.payload;
      state.token = items;
    },
    storeUserId: (state, action) => {
      const { userId, login, viewer } = action.payload;
      if (!userId) return;
      const findExitId = state.userId.find((item) => item.userId === userId);
      if (findExitId) return;
      if (viewer === undefined) {
        viewer = -1;
      }
      state.userId.push({ userId, login, viewer });
      localStorage.setItem(
        "userId",
        JSON.stringify(state.userId.map((item) => item))
      );
    },
    deleteUserId: (state, action) => {
      const { userId } = action.payload;
      const filterItem = state.userId.filter((item) => item.userId !== userId);
      state.userId = filterItem;
      localStorage.setItem(
        "userId",
        JSON.stringify(state.userId.map((item) => item))
      );
    },
    changeUserState: (state, action) => {
      const { userId, viewer } = action.payload;
      const findExit = state.userId.find((item) => item.userId === userId);
      //判斷實況主有無開台，無開台是undefined
      //有開台會有觀眾數量
      if (viewer === undefined) {
        //因為要用sort進行排序，所以未開台設-1
        findExit.viewer = -1;
      } else if (viewer >= 0) {
        findExit.viewer = viewer;
      }
      localStorage.setItem(
        "userId",
        JSON.stringify(state.userId.map((item) => item))
      );
    },
  },
});

export const storeIdActions = tokenSlice.actions;

export default tokenSlice;
