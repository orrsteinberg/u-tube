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
  async (videoId) => {
    // Get list of related video IDs
    const relatedVideosResponse = await api.getRelatedVideos(videoId);
    const relatedVideosIds = relatedVideosResponse.data.items.map(
      (item) => item.id.videoId
    );

    // Get videos by ID so we can have their contentData (needed for video duration)
    const videosResponse = await api.getVideosById(relatedVideosIds);
    return videosResponse.data.items;
  }
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
    [fetchRelatedVideos.pending]: (state, action) => {
      state.relatedVideos.status = "loading";
    },
    [fetchRelatedVideos.fulfilled]: (state, action) => {
      state.relatedVideos.status = "succeeded";

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

      state.relatedVideos.videos = videos;
    },
    [fetchRelatedVideos.rejected]: (state, action) => {
      state.relatedVideos.status = "failed";
      state.relatedVideos.error = action.error.message;
    },
    [fetchComments.pending]: (state, action) => {},
    [fetchComments.fulfilled]: (state, action) => {},
    [fetchComments.rejected]: (state, action) => {},
  },
});

// Selectors
export const selectVideoToWatch = (state) => state.watch;
export const selectRelatedVideos = (state) => state.watch.relatedVideos;

export default watchSlice.reducer;
