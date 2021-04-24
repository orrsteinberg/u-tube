import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../utils/api";

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
  async (_, { getState }) => {
    // Grab category ID and page token
    const category = getState().explore.currentCategory;
    const pageToken = getState().explore[category].pageToken;
    const categoryId = categoryIds[category];

    // Get videos
    const videosResponse = await api.getVideosByCategoryId(
      categoryId,
      pageToken
    );

    // Channel avatars are not included in the API response so we have to make another request
    const channelIds = videosResponse.data.items.map(
      (v) => v.snippet.channelId
    );
    const channelsResponse = await api.getChannelsById(channelIds);

    return {
      videos: videosResponse.data.items,
      channels: channelsResponse.data.items,
      pageToken: videosResponse.data.nextPageToken,
    };
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

      // Create array of channel avatar objects with id and url keys
      const channelAvatars = action.payload.channels.map((channel) => ({
        id: channel.id,
        url: channel.snippet.thumbnails.default.url,
      }));

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
          // Find the appropriate channel avatar url by its id
          channelAvatar: channelAvatars.find(
            (c) => c.id === video.snippet.channelId
          ).url,
        };
      });

      // Update current category, videos and page token
      state.currentCategory = category;
      state[category].videos = state[category].videos.concat(newVideos);

      // If there was no next page token, we've fetched all the videos for this channel
      if (action.payload.pageToken) {
        state[category].pageToken = action.payload.pageToken;
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
export const selectCurrentCategory = (state) => {
  return state.explore.currentCategory;
};
export const selectExplorer = (state) => {
  const currentCategory = state.explore.currentCategory;
  return state.explore[currentCategory];
};

export default exploreSlice.reducer;
