import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../utils/api";

// State shape
const initialState = {
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
  channels: [],
  videos: [],
};

// Async thunks
export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (query) => {
    // Get search results
    const searchResponse = await api.getSearchResults(query);

    if (searchResponse.data.items.length === 0) {
      throw new Error("No results found");
    }

    // Make additional requests for video and channel data as needed
    const channelIds = [];
    const videoIds = [];
    searchResponse.data.items.forEach((item) => {
      if (item.id.kind === "youtube#channel") {
        channelIds.push(item.id.channelId);
      } else if (item.id.kind === "youtube#video") {
        videoIds.push(item.id.videoId);
      }
    });

    const channelsResponse =
      channelIds.length > 0 && (await api.getChannelsById(channelIds));
    const videosResponse =
      videoIds.length > 0 && (await api.getVideosById(videoIds));

    return {
      channels: channelsResponse.data?.items,
      videos: videosResponse.data?.items,
    };
  }
);
//
// State slice
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: {
    // Using Immer under the hood so we're not mutating the actual state
    [fetchSearchResults.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchSearchResults.fulfilled]: (state, action) => {
      state.status = "succeeded";

      // Customize data shape
      const channels =
        action.payload.channels &&
        action.payload.channels.map((channel) => {
          return {
            id: channel.id,
            title: channel.snippet.title,
            avatar: channel.snippet.thumbnails.default.url,
            subscriberCount: channel.statistics.subscriberCount,
            videoCount: channel.statistics.videoCount,
          };
        });

      const videos =
        action.payload.videos &&
        action.payload.videos.map((video) => {
          return {
            id: video.id,
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails.medium.url,
            channelId: video.snippet.channelId,
            channelTitle: video.snippet.channelTitle,
            viewCount: video.statistics.viewCount,
            publishedAt: video.snippet.publishedAt,
            duration: video.contentDetails.duration,
            description: video.snippet.description,
          };
        });

      // if there were no videos or channel found, set to empty array rather than undefined
      state.videos = videos || [];
      state.channels = channels || [];
    },
    [fetchSearchResults.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Selectors
export const selectSearch = (state) => state.search;

export default searchSlice.reducer;
