import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getCategoryVideos, handleResultErrors } from "../../utils/helpers";

// Category IDs
const categoryIds = {
  music: 10,
  gaming: 20,
  news: 25,
  sports: 17,
  comedy: 23,
};

// State shape
const initialState = {
  currentCategory: null,
  music: {
    videos: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
    pageToken: null,
    hasMoreVideos: true,
  },
  gaming: {
    videos: [],
    status: "idle",
    error: null,
    pageToken: null,
    hasMoreVideos: true,
  },
  news: {
    videos: [],
    status: "idle",
    error: null,
    pageToken: null,
    hasMoreVideos: true,
  },
  sports: {
    videos: [],
    status: "idle",
    error: null,
    pageToken: null,
    hasMoreVideos: true,
  },
  comedy: {
    videos: [],
    status: "idle",
    error: null,
    pageToken: null,
    hasMoreVideos: true,
  },
};

// Async thunks
export const fetchVideosToExplore = createAsyncThunk(
  "explore/fetchVideosToExplore",
  (_, { getState }) => {
    // Grab category ID and page token
    const category = getState().explore.currentCategory;
    const pageToken = getState().explore[category].pageToken;
    const categoryId = categoryIds[category];

    return getCategoryVideos(categoryId, pageToken)
      .then((result) => result)
      .catch(handleResultErrors);
  }
);

// State slice
const exploreSlice = createSlice({
  name: "explore",
  initialState,
  reducers: {
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
  extraReducers: {
    [fetchVideosToExplore.pending]: (state, action) => {
      const category = state.currentCategory;
      state[category].status = "loading";
    },
    [fetchVideosToExplore.fulfilled]: (state, action) => {
      const category = state.currentCategory;
      state[category].status = "succeeded";
      state[category].videos = state[category].videos.concat(
        action.payload.videos
      );

      // If there was no next page token, we've fetched all the videos for this channel
      if (action.payload.nextPageToken) {
        state[category].pageToken = action.payload.nextPageToken;
      } else {
        state[category].pageToken = null;
        state[category].hasMoreVideos = false;
      }
    },
    [fetchVideosToExplore.rejected]: (state, action) => {
      const category = state.currentCategory;
      state[category].status = "failed";
      state[category].error = action.error.message;
    },
  },
});

// Actions
export const { setCurrentCategory } = exploreSlice.actions;

// Selectors
export const selectExplore = (state) => {
  return state.explore;
};

export const selectCurrentCategoryData = (state) => {
  const currentCategory = state.explore.currentCategory;
  return state.explore[currentCategory];
};

export default exploreSlice.reducer;
