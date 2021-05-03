import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getVideosWithAvatars, handleResultErrors } from "../../utils/helpers";

// State shape
const initialState = {
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
  videos: [],
  pageToken: null,
  hasMoreVideos: true,
};

// Async thunks
export const fetchHomeVideos = createAsyncThunk(
  "home/fetchHomeVideos",
  (_, { getState }) => {
    const pageToken = getState().home.pageToken;
    return getVideosWithAvatars({ pageToken })
      .then((result) => result)
      .catch(handleResultErrors);
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
      state.videos = state.videos.concat(action.payload.videos);

      // If there was no next page token, we've fetched all the videos for this channel
      if (action.payload.nextPageToken) {
        state.pageToken = action.payload.nextPageToken;
      } else {
        state.pageToken = null;
        state.hasMoreVideos = false;
      }
    },
    [fetchHomeVideos.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Selectors
export const selectHome = (state) => state.home;

export default homeSlice.reducer;
