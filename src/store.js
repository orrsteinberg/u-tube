import { configureStore } from "@reduxjs/toolkit";

import homeReducer from "./features/home/homeSlice";
import watchReducer from "./features/watch/watchSlice";
import channelReducer from "./features/channel/channelSlice";

const store = configureStore({
  reducer: {
    home: homeReducer,
    watch: watchReducer,
    channel: channelReducer,
  },
});

export default store;
