import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../utils/api";

// State shape
const initialState = {
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
  items: [], // YouTube API works with "subscription resources" rather than simple channels
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

export const updateSubscription = createAsyncThunk(
  "subscriptions/updateSubscription",
  async (channelId, { getState }) => {
    // Subscribe/unsubscribe from channel
    const isSubscribed = getState().subscriptions.items.find(
      (item) => item.channel.id === channelId
    );
    const accessToken = getState().auth.accessToken;

    if (isSubscribed) {
      // TODO: Delete subscription
    } else {
      // TODO: Add new subscription
    }
  }
);

// State slice
const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    clearSubscriptions: (state, action) => {
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
      const items = action.payload.map((item) => {
        return {
          id: item.id,
          channel: {
            id: item.snippet.resourceId.channelId,
            title: item.snippet.title,
            avatar: item.snippet.thumbnails.default.url,
            videoCount: item.contentDetails.totalItemCount,
            newVideoCount: item.contentDetails.newItemCount,
          },
        };
      });

      state.items = items;
    },
    [fetchSubscriptions.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Actions
export const { clearSubscriptions } = subscriptionsSlice.actions;

// Selectors
export const selectSubscriptions = (state) => state.subscriptions;

export default subscriptionsSlice.reducer;
