import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getSubscriptions,
  addSubscription,
  deleteSubscription,
  handleResultErrors,
} from "../../utils/helpers";

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
  (_, { getState }) => {
    const accessToken = getState().auth.accessToken;
    return getSubscriptions(accessToken)
      .then((result) => result)
      .catch(handleResultErrors);
  }
);

export const subscribe = createAsyncThunk(
  "subscriptions/subscribe",
  (channelId, { getState }) => {
    const accessToken = getState().auth.accessToken;
    return addSubscription(channelId, accessToken)
      .then((result) => result)
      .catch(handleResultErrors);
  }
);

export const unsubscribe = createAsyncThunk(
  "subscriptions/unsubscribe",
  (channelId, { getState }) => {
    const accessToken = getState().auth.accessToken;
    const subscription = getState().subscriptions.items.find(
      (item) => item.channel.id === channelId
    );

    return deleteSubscription(subscription.id, accessToken)
      .then((deletedId) => deletedId)
      .catch(handleResultErrors);
  }
);

// State slice
const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    clearSubscriptions: (state, action) => {
      state.status = "failed";
      state.error = "You must be signed in to view your subscriptions";
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
      state.items = action.payload;
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
      state.items.push(action.payload);
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
