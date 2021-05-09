import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getVideoToWatch,
  getRelatedVideos,
  getComments,
  addComment,
  handleResultErrors,
} from "../../utils/helpers";

// State shape
const initialState = {
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
  currentVideo: {
    id: null,
    title: "",
    description: "",
    likeCount: null,
    dislikeCount: null,
    viewCount: null,
    publishedAt: null,
    channel: {
      id: null,
      name: null,
      avatar: null,
      subscriberCount: null,
    },
  },
  relatedVideos: {
    videos: [],
    status: "idle",
    error: null,
  },
  commentSection: {
    comments: [],
    status: "idle",
    error: null,
    newCommentStatus: "idle",
    newCommentError: null,
  },
};

// Async thunks
export const fetchVideoToWatch = createAsyncThunk(
  "watch/fetchVideoToWatch",
  (videoId, { dispatch }) => {
    return getVideoToWatch(videoId)
      .then((result) => {
        // If video exists, fetch related videos and comments
        dispatch(fetchRelatedVideos(videoId));
        dispatch(fetchComments(videoId));
        return result;
      })
      .catch(handleResultErrors);
  }
);

export const fetchRelatedVideos = createAsyncThunk(
  "watch/fetchRelatedVideos",
  (videoId) => {
    return getRelatedVideos(videoId)
      .then((videos) => videos)
      .catch(handleResultErrors);
  }
);

export const fetchComments = createAsyncThunk(
  "watch/fetchComments",
  (videoId) => {
    return getComments(videoId)
      .then((comments) => comments)
      .catch(handleResultErrors);
  }
);

export const postComment = createAsyncThunk(
  "watch/postComment",
  ({ videoId, text }, { getState }) => {
    const accessToken = getState().auth.accessToken;
    return addComment(videoId, text, accessToken);
  }
);

// State slice
const watchSlice = createSlice({
  name: "watch",
  initialState,
  reducers: {
    clearStatus: (state, action) => {
      state.relatedVideos.status = "idle";
      state.commentSection.status = "idle";
      state.commentSection.newCommentStatus = "idle";
    },
  },
  extraReducers: {
    // Using Immer under the hood so we're not mutating the actual state
    [fetchVideoToWatch.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchVideoToWatch.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.currentVideo = action.payload;
    },
    [fetchVideoToWatch.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchRelatedVideos.pending]: (state, action) => {
      state.relatedVideos.status = "loading";
    },
    [fetchRelatedVideos.fulfilled]: (state, action) => {
      state.relatedVideos.status = "succeeded";
      state.relatedVideos.videos = action.payload;
    },
    [fetchRelatedVideos.rejected]: (state, action) => {
      state.relatedVideos.status = "failed";
      state.relatedVideos.error = action.error.message;
    },
    [fetchComments.pending]: (state, action) => {
      state.commentSection.status = "loading";
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.commentSection.status = "succeeded";
      state.commentSection.comments = action.payload;
    },
    [fetchComments.rejected]: (state, action) => {
      state.commentSection.status = "failed";
      state.commentSection.error = action.error.message;
    },
    [postComment.pending]: (state, action) => {
      state.commentSection.newCommentStatus = "loading";
    },
    [postComment.fulfilled]: (state, action) => {
      state.commentSection.newCommentStatus = "succeeded";
      state.commentSection.comments.unshift(action.payload);
    },
    [postComment.rejected]: (state, action) => {
      state.commentSection.newCommentStatus = "failed";
      state.commentSection.newCommentError = action.error.message;
    },
  },
});

// Actions
export const { clearStatus } = watchSlice.actions;

// Selectors
export const selectVideoToWatch = (state) => state.watch;
export const selectRelatedVideos = (state) => state.watch.relatedVideos;
export const selectCommentSection = (state) => state.watch.commentSection;

export default watchSlice.reducer;
