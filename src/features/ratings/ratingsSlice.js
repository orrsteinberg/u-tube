import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getRatings, rateVideo, handleResultErrors } from "../../utils/helpers";

// State shape
const initialState = {
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
  likedVideos: [],
  dislikedVideos: [],
  updateInProgress: {
    // Request status for liking/disliking videos
    status: "idle",
    error: null,
  },
};

// Async thunks
export const fetchRatings = createAsyncThunk(
  "ratings/fetchRatings",
  (_, { getState }) => {
    const accessToken = getState().auth.accessToken;
    return getRatings(accessToken)
      .then((result) => result)
      .catch(handleResultErrors);
  }
);

export const like = createAsyncThunk(
  "ratings/like",
  (videoId, { getState }) => {
    const accessToken = getState().auth.accessToken;
    return rateVideo(videoId, "like", accessToken)
      .then((result) => result)
      .catch(handleResultErrors);
  }
);

export const dislike = createAsyncThunk(
  "ratings/dislike",
  (videoId, { getState }) => {
    const accessToken = getState().auth.accessToken;
    return rateVideo(videoId, "dislike", accessToken)
      .then((result) => result)
      .catch(handleResultErrors);
  }
);

export const removeRating = createAsyncThunk(
  "ratings/removeRating",
  (videoId, { getState }) => {
    const accessToken = getState().auth.accessToken;
    return rateVideo(videoId, "none", accessToken)
      .then((result) => result)
      .catch(handleResultErrors);
  }
);

// State slice
const ratingsSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {
    clearRatings: (state, action) => {
      state.status = "idle";
      state.error = null;
      state.likedVideos = [];
      state.dislikedVideos = [];
    },
  },
  extraReducers: {
    // Using Immer under the hood so we're not mutating the actual state
    [fetchRatings.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchRatings.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.likedVideos = action.payload.likedVideos;
      state.dislikedVideos = action.payload.dislikedVideos;
    },
    [fetchRatings.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [like.pending]: (state, action) => {
      state.updateInProgress.status = "loading";
    },
    [like.fulfilled]: (state, action) => {
      state.updateInProgress.status = "succeeded";
      // Remove from disliked videos, add to liked videos
      state.dislikedVideos = state.dislikedVideos.filter(
        (v) => v !== action.payload
      );
      state.likedVideos.push(action.payload);
    },
    [like.rejected]: (state, action) => {
      state.updateInProgress.status = "failed";
      state.updateInProgress.error = action.error.message;
    },
    [dislike.pending]: (state, action) => {
      state.updateInProgress.status = "loading";
    },
    [dislike.fulfilled]: (state, action) => {
      state.updateInProgress.status = "succeeded";
      // Remove from liked videos, add to disliked videos
      state.likedVideos = state.likedVideos.filter((v) => v !== action.payload);
      state.dislikedVideos.push(action.payload);
    },
    [dislike.rejected]: (state, action) => {
      state.updateInProgress.status = "failed";
      state.updateInProgress.error = action.error.message;
    },
    [removeRating.pending]: (state, action) => {
      state.updateInProgress.status = "loading";
    },
    [removeRating.fulfilled]: (state, action) => {
      state.updateInProgress.status = "succeeded";
      // Remove from both liked videos and disliked videos
      state.likedVideos = state.likedVideos.filter((v) => v !== action.payload);
      state.dislikedVideos = state.dislikedVideos.filter(
        (v) => v !== action.payload
      );
    },
    [removeRating.rejected]: (state, action) => {
      state.updateInProgress.status = "failed";
      state.updateInProgress.error = action.error.message;
    },
  },
});

// Actions
export const { clearRatings } = ratingsSlice.actions;

// Selectors
export const selectRatings = (state) => state.ratings;

export default ratingsSlice.reducer;
