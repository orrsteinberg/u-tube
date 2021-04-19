import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../utils/api";

// State shape
const initialState = {
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
  items: [],
  updateInProgress: {
    // Request status for adding/removing subscriptions
    status: "idle",
    error: null,
  },
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

export const subscribe = createAsyncThunk(
  "subscriptions/subscribe",
  async (channelId, { getState }) => {
    const accessToken = getState().auth.accessToken;
    const subResponse = await api.addSubscription(channelId, accessToken);
    return subResponse.data;
  }
);

export const unsubscribe = createAsyncThunk(
  "subscriptions/unsubscribe",
  async (channelId, { getState }) => {
    const accessToken = getState().auth.accessToken;
    const subscription = getState().subscriptions.items.find(
      (item) => item.channel.id === channelId
    );

    await api.deleteSubscription(subscription.id, accessToken);

    return subscription.id;
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
    [subscribe.pending]: (state, action) => {
      state.updateInProgress.status = "loading";
    },
    [subscribe.fulfilled]: (state, action) => {
      state.updateInProgress.status = "succeeded";

      const item = action.payload;

      // Customize data shape
      const newItem = {
        id: item.id,
        channel: {
          id: item.snippet.resourceId.channelId,
          title: item.snippet.title,
          avatar: item.snippet.thumbnails.default.url,
          videoCount: item.contentDetails.totalItemCount,
          newVideoCount: item.contentDetails.newItemCount,
        },
      };

      state.items.push(newItem);
    },
    [subscribe.rejected]: (state, action) => {
      state.updateInProgress.status = "failed";
      state.updateInProgress.error = action.error.message;
    },
    [unsubscribe.pending]: (state, action) => {
      state.updateInProgress.status = "loading";
    },
    [unsubscribe.fulfilled]: (state, action) => {
      state.updateInProgress.status = "succeeded";

      const deletedId = action.payload;
      state.items = state.items.filter((item) => item.id !== deletedId);
    },
    [unsubscribe.rejected]: (state, action) => {
      state.updateInProgress.status = "failed";
      state.updateInProgress.error = action.error.message;
    },
  },
});

// Actions
export const { clearSubscriptions } = subscriptionsSlice.actions;

// Selectors
export const selectSubscriptions = (state) => state.subscriptions;

export default subscriptionsSlice.reducer;
