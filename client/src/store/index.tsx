import { configureStore } from "@reduxjs/toolkit";

import { accessTokenReducer } from "./reducers/accessTokenReducer";
import { setDeviceReducer } from "./reducers/deviceIdReducer";
import { searchListReducer } from "./reducers/searchListReducer";
import { selectTrackReducer } from "./reducers/selectTrackReducer";

const store = configureStore({
  reducer: {
    accessToken: accessTokenReducer.reducer,
    searchList: searchListReducer.reducer,
    track: selectTrackReducer.reducer,
    deviceId: setDeviceReducer.reducer,
  },
});

export default store;
