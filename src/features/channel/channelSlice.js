import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../utils/api";

// State shape
const initialState = {
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
  title: "",
  avatar: null,
  subscriberCount: null,
  isSubscribed: false,
  channelVideos: {
    videos: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
};

// Async thunks
export const fetchChannelData = createAsyncThunk(
  "watch/fetchChannelData",
  async (channelId) => {
    // Get Channel
    const channelResponse = await api.getChannelById(channelId);
    return channelResponse.data.items[0];
  }
);

export const fetchChannelVideos = createAsyncThunk(
  "watch/fetchChannelVideos",
  async (channelId) => {
    // Get list of related video IDs
    const channelVideosResponse = await api.getChannelVideos(channelId);
    const channelVideosIds = channelVideosResponse.data.items.map(
      (item) => item.id.videoId
    );

    // Get videos by ID so we can have their contentData (needed for video duration)
    const videosResponse = await api.getVideosById(channelVideosIds);
    return videosResponse.data.items;
  }
);

// State slice
const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {},
  extraReducers: {
    // Using Immer under the hood so we're not mutating the actual state
    [fetchChannelData.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchChannelData.fulfilled]: (state, action) => {
      state.status = "succeeded";

      const { title } = action.payload.snippet;
      const { url: avatar } = action.payload.snippet.thumbnails.default;
      const { subscriberCount } = action.payload.statistics;

      // Update state
      state.title = title;
      state.avatar = avatar;
      state.subscriberCount = subscriberCount || null;
      state.isSubscribed = false; // Default to false for now
    },
    [fetchChannelData.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchChannelVideos.pending]: (state, action) => {
      state.channelVideos.status = "loading";
    },
    [fetchChannelVideos.fulfilled]: (state, action) => {
      state.channelVideos.status = "succeeded";

      // Customize data shape
      const videos = action.payload.map((video) => {
        return {
          id: video.id,
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails.medium.url,
          channelId: video.snippet.channelId,
          channelTitle: video.snippet.channelTitle,
          viewCount: video.statistics.viewCount,
          publishedAt: video.snippet.publishedAt,
          duration: video.contentDetails.duration,
        };
      });

      state.channelVideos.videos = videos;
    },
    [fetchChannelVideos.rejected]: (state, action) => {
      state.channelVideos.status = "failed";
      state.channelVideos.error = action.error.message;
    },
  },
});

// Selectors
export const selectChannelData = (state) => state.channel;
export const selectChannelVideos = (state) => state.channel.channelVideos;

export default channelSlice.reducer;
