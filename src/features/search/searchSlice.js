import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getSearchResults, handleResultErrors } from "../../utils/helpers";

// State shape
const initialState = {
  currentQuery: null,
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
  channels: [],
  videos: [],
};

// Async thunks
export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  (query) => {
    return getSearchResults(query)
      .then((results) => results)
      .catch(handleResultErrors);
  }
);
//
// State slice
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchView: (state, action) => {
      state.currentQuery = action.payload;
      state.videos = [];
      state.channels = [];
      state.error = null;
    },
  },
  extraReducers: {
    // Using Immer under the hood so we're not mutating the actual state
    [fetchSearchResults.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchSearchResults.fulfilled]: (state, action) => {
      state.status = "succeeded";
      console.log(action.payload);
      state.channels = action.payload.channels;
      state.videos = action.payload.videos;
    },
    [fetchSearchResults.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Actions
export const { updateSearchView } = searchSlice.actions;

// Selectors
export const selectSearch = (state) => state.search;

export default searchSlice.reducer;
