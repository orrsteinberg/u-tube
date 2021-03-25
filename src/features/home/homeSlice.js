import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../utils/api";

// State shape
const initialState = {
  videos: [],
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
  pageToken: null,
};

// Async thunks
export const fetchHomeVideos = createAsyncThunk(
  "home/fetchHomeVideos",
  async (_, { getState }) => {
    const pageToken = getState().home.pageToken;
    const response = await api.getHomeVideos(pageToken);
    return response.data;
  }
);

// State slice
const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: {
    // Using Immer under the hood so we're not mutating the actual state
    [fetchHomeVideos.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchHomeVideos.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.videos = state.videos.concat(action.payload.items);
      state.pageToken = action.payload.nextPageToken;
    },
    [fetchHomeVideos.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Selectors
export const selectAllVideos = (state) => state.home.videos;
export const selectHomeStatus = (state) => state.home.status;

export default homeSlice.reducer;
