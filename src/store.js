import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/authSlice";
import homeReducer from "./features/home/homeSlice";
import watchReducer from "./features/watch/watchSlice";
import channelReducer from "./features/channel/channelSlice";
import searchReducer from "./features/search/searchSlice";
import subscriptionsReducer from "./features/subscriptions/subscriptionsSlice";
import exploreReducer from "./features/explore/exploreSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    watch: watchReducer,
    channel: channelReducer,
    search: searchReducer,
    subscriptions: subscriptionsReducer,
    explore: exploreReducer,
  },
});

export default store;
