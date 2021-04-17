import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../utils/api";

// State shape
const initialState = {
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
  channels: [],
};

// Async thunks
export const fetchSubscriptions = createAsyncThunk(
  "subscriptions/fetchSubscriptions",
  async (_, { getState }) => {
    // Get subscriptions
    const accessToken = getState().auth.accessToken;
    const subResponse = await api.getSubscriptions(accessToken);

    return subResponse.data.items;
  }
);
//
// State slice
const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    subscriptionsLoginRequired: (state, action) => {
      state.status = "failed";
      state.error = "You must be logged in to view your subscriptions";
      state.channels = [];
    },
  },
  extraReducers: {
    // Using Immer under the hood so we're not mutating the actual state
    [fetchSubscriptions.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchSubscriptions.fulfilled]: (state, action) => {
      state.status = "succeeded";

      // Customize data shape
      const channels = action.payload.map((channel) => {
        return {
          id: channel.snippet.resourceId.channelId,
          title: channel.snippet.title,
          avatar: channel.snippet.thumbnails.default.url,
          videoCount: channel.contentDetails.totalItemCount,
          newVideoCount: channel.contentDetails.newItemCount,
        };
      });

      state.channels = channels;
    },
    [fetchSubscriptions.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Actions
export const { subscriptionsLoginRequired } = subscriptionsSlice.actions;

// Selectors
export const selectSubscriptions = (state) => state.subscriptions;

export default subscriptionsSlice.reducer;
