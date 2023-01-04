import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trackList: [],
};

export const searchListReducer = createSlice({
  name: "accessToken",
  initialState,
  reducers: {
    setList(state, action) {
      state.trackList = action.payload;
    },
  },
});

export const searchListActions = searchListReducer.actions;
