import { configureStore } from "@reduxjs/toolkit";

import homeReducer from "./features/home/homeSlice";
import watchReducer from "./features/watch/watchSlice";

const store = configureStore({
  reducer: {
    home: homeReducer,
    watch: watchReducer
  },
});

export default store;
