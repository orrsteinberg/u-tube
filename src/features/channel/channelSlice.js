import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../utils/api";

// State shape
const initialState = {
  channelId: null,
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
  title: "",
  avatar: null,
  subscriberCount: null,
  videoCount: null,
  isSubscribed: false,
  channelVideos: {
    videos: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
    pageToken: null,
  },
};

// Async thunks
export const fetchChannelData = createAsyncThunk(
  "channel/fetchChannelData",
  async (channelId, { dispatch }) => {
    // Get Channel
    const channelResponse = await api.getChannelById(channelId);

    if (channelResponse.data.pageInfo.totalResults === 0) {
      throw new Error("Channel not found");
    }

    // If channel exists, fetch videos
    dispatch(fetchInitialChannelVideos(channelId));

    return channelResponse.data.items[0];
  }
);

export const fetchInitialChannelVideos = createAsyncThunk(
  "channel/fetchInitialChannelVideos",
  async (channelId) => {
    // Get list of video IDs (without pageToken so we start from 0)
    const channelVideosResponse = await api.getChannelVideos(channelId);
    const channelVideosIds = channelVideosResponse.data.items.map(
      (item) => item.id.videoId
    );

    // Get videos by ID so we can have their contentData (needed for video duration)
    const videosResponse = await api.getVideosById(channelVideosIds);

    return {
      videos: videosResponse.data.items,
      pageToken: channelVideosResponse.data.nextPageToken,
    };
  }
);

export const fetchChannelVideos = createAsyncThunk(
  "channel/fetchChannelVideos",
  async (channelId, { getState }) => {
    const pageToken = getState().channel.channelVideos.pageToken;

    // Get list of video IDs (with pageToken so we continute from previous fetch)
    const channelVideosResponse = await api.getChannelVideos(
      channelId,
      pageToken
    );
    const channelVideosIds = channelVideosResponse.data.items.map(
      (item) => item.id.videoId
    );

    // Get videos by ID so we can have their contentData (needed for video duration)
    const videosResponse = await api.getVideosById(channelVideosIds);

    return {
      videos: videosResponse.data.items,
      pageToken: channelVideosResponse.data.nextPageToken,
    };
  }
);

// State slice
const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    clearChannelView: (state, action) => {
      state.status = "loading";
      state.channelVideos.status = "loading";
      state.channelVideos.videos = [];
    },
  },
  extraReducers: {
    // Using Immer under the hood so we're not mutating the actual state
    [fetchChannelData.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchChannelData.fulfilled]: (state, action) => {
      state.status = "succeeded";

      const { id } = action.payload;
      const { title } = action.payload.snippet;
      const { url: avatar } = action.payload.snippet.thumbnails.default;
      const { subscriberCount, videoCount } = action.payload.statistics;

      // Update state
      state.channelId = id;
      state.title = title;
      state.avatar = avatar;
      state.subscriberCount = subscriberCount || null;
      state.videoCount = videoCount;
      state.isSubscribed = false; // Default to false for now
    },
    [fetchChannelData.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchInitialChannelVideos.pending]: (state, action) => {
      state.channelVideos.status = "loading";
    },
    [fetchInitialChannelVideos.fulfilled]: (state, action) => {
      state.channelVideos.status = "succeeded";

      // Customize data shape
      const newVideos = action.payload.videos.map((video) => {
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

      // Update videos and page token
      state.channelVideos.videos = newVideos;
      state.channelVideos.pageToken = action.payload.pageToken;
    },
    [fetchInitialChannelVideos.rejected]: (state, action) => {
      state.channelVideos.status = "failed";
      state.channelVideos.error = action.error.message;
    },
    [fetchChannelVideos.pending]: (state, action) => {
      state.channelVideos.status = "loading";
    },
    [fetchChannelVideos.fulfilled]: (state, action) => {
      state.channelVideos.status = "succeeded";

      // Customize data shape
      const newVideos = action.payload.videos.map((video) => {
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

      // Update videos and page token
      state.channelVideos.videos = state.channelVideos.videos.concat(newVideos);
      state.channelVideos.pageToken = action.payload.pageToken;
    },
    [fetchChannelVideos.rejected]: (state, action) => {
      state.channelVideos.status = "failed";
      state.channelVideos.error = action.error.message;
    },
  },
});

// Actions
export const { clearChannelView } = channelSlice.actions;

// Selectors
export const selectChannelData = (state) => state.channel;
export const selectChannelVideos = (state) => state.channel.channelVideos;

export default channelSlice.reducer;
