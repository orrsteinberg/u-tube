import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../utils/api";

// State shape
const initialState = {
  videos: [],
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
  pageToken: null,
  hasMoreVideos: true,
};

// Async thunks
export const fetchHomeVideos = createAsyncThunk(
  "home/fetchHomeVideos",
  async (_, { getState }) => {
    // Get videos
    const pageToken = getState().home.pageToken;
    const videosResponse = await api.getHomeVideos(pageToken);

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

      // Update videos
      state.videos = state.videos.concat(newVideos);

      // If there was no next page token, we've fetched all the videos for this channel
      if (action.payload.pageToken) {
        state.pageToken = action.payload.pageToken;
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
