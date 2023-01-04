import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deviceId: "",
};

export const setDeviceReducer = createSlice({
  name: "accessToken",
  initialState,
  reducers: {
    setDevice(state, action) {
      state.deviceId = action.payload;
    },
  },
});

export const setDeviceActions = setDeviceReducer.actions;
