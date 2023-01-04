import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  artist: "",
  image: "",
  id: "",
  duration_ms: 0,
};

export const selectTrackReducer = createSlice({
  name: "accessToken",
  initialState,
  reducers: {
    setTrack(state, action) {
      state.name = action.payload.name;
      state.artist = action.payload.artist;
      state.image = action.payload.image;
      state.id = action.payload.id;
      state.duration_ms = action.payload.duration_ms;
    },
  },
});

export const selectTrackActions = selectTrackReducer.actions;
