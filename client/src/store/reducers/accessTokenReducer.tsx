import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  expire: "",
  refreshToken: "",
};

export const accessTokenReducer = createSlice({
  name: "accessToken",
  initialState,
  reducers: {
    setToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.expire = action.payload.expire;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const accessTokenActions = accessTokenReducer.actions;
