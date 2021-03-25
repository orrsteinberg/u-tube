import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../utils/api";

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
      numSubs: null,
      isSubscribed: false,
    },
  },
  relatedVideos: {
    videos: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  comments: {
    comments: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
};

// Async thunks
export const fetchVideoToWatch = createAsyncThunk(
  "watch/fetchVideoToWatch",
  async (videoId) => {
    // Get video
    const videoResponse = await api.getVideoById(videoId);

    // Channel data is not included in the API response so we have to make another request
    const channelId = videoResponse.data.items[0].snippet.channelId;
    const channelResponse = await api.getChannelById(channelId);

    return {
      video: videoResponse.data.items[0],
      channel: channelResponse.data.items[0],
    };
  }
);

export const fetchRelatedVideos = createAsyncThunk(
  "watch/fetchRelatedVideos",
  async (videoId) => {}
);

export const fetchComments = createAsyncThunk(
  "watch/fetchComments",
  async (videoId) => {}
);

// State slice
const watchSlice = createSlice({
  name: "watch",
  initialState,
  reducers: {},
  extraReducers: {
    // Using Immer under the hood so we're not mutating the actual state
    [fetchVideoToWatch.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchVideoToWatch.fulfilled]: (state, action) => {
      state.status = "succeeded";

      const videoData = action.payload.video;
      const channelData = action.payload.channel;

      // Customize data shape
      const video = {
        id: videoData.id,
        title: videoData.snippet.title,
        description: videoData.snippet.description,
        likeCount: videoData.statistics.likeCount,
        dislikeCount: videoData.statistics.dislikeCount,
        viewCount: videoData.statistics.viewCount,
        publishedAt: videoData.snippet.publishedAt,
        channel: {
          id: videoData.snippet.channelId,
          title: videoData.snippet.channelTitle,
          avatar: channelData.snippet.thumbnails.default.url,
          subscriberCount: channelData.statistics.subscriberCount,
          isSubscribed: false, // default to false for now
        },
      };

      // Update state
      state.currentVideo = video;
    },
    [fetchVideoToWatch.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchRelatedVideos.pending]: (state, action) => {},
    [fetchRelatedVideos.fulfilled]: (state, action) => {},
    [fetchRelatedVideos.rejected]: (state, action) => {},
    [fetchComments.pending]: (state, action) => {},
    [fetchComments.fulfilled]: (state, action) => {},
    [fetchComments.rejected]: (state, action) => {},
  },
});

// Selectors
export const selectCurrentVideo = (state) => state.watch.currentVideo;
export const selectRelatedVideos = (state) => state.watch.relatedVideos;
export const selectComments = (state) => state.watch.comments;
export const seletchWatchStatus = (state) => state.watch.status;

export default watchSlice.reducer;
