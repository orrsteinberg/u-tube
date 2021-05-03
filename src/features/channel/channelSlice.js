import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getChannelData,
  getChannelVideos,
  handleResultErrors,
} from "../../utils/helpers";

// State shape
const initialState = {
  channelId: null,
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
  title: "",
  avatar: null,
  subscriberCount: null,
  videoCount: null,
  channelVideos: {
    videos: [],
    status: "idle",
    error: null,
    pageToken: null,
    hasMoreVideos: true,
  },
};

// Async thunks
export const fetchChannelData = createAsyncThunk(
  "channel/fetchChannelData",
  (channelId, { dispatch }) => {
    return getChannelData(channelId)
      .then((channelData) => {
        // If channel exists, fetch videos
        dispatch(fetchChannelVideos(channelId));
        return channelData;
      })
      .catch(handleResultErrors);
  }
);

export const fetchChannelVideos = createAsyncThunk(
  "channel/fetchChannelVideos",
  (channelId, { getState }) => {
    const pageToken = getState().channel.channelVideos.pageToken;
    return getChannelVideos(channelId, pageToken)
      .then((result) => result)
      .catch(handleResultErrors);
  }
);

// State slice
const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    clearChannelView: (state, action) => {
      state.status = "idle";
      state.error = null;
      state.channelVideos.videos = [];
      state.channelVideos.pageToken = null;
    },
  },
  extraReducers: {
    // Using Immer under the hood so we're not mutating the actual state
    [fetchChannelData.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchChannelData.fulfilled]: (state, action) => {
      state.status = "succeeded";

      const { id, title, avatar, subscriberCount, videoCount } = action.payload;

      // Update state
      state.channelId = id;
      state.title = title;
      state.avatar = avatar;
      state.subscriberCount = subscriberCount || null;
      state.videoCount = videoCount;
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

      const { videos, nextPageToken } = action.payload;

      // Update videos
      state.channelVideos.videos = state.channelVideos.videos.concat(videos);

      // If there was no next page token, we've fetched all the videos for this channel
      if (nextPageToken) {
        state.channelVideos.pageToken = nextPageToken;
      } else {
        state.channelVideos.pageToken = null;
        state.channelVideos.hasMoreVideos = false;
      }
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
