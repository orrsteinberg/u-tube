import { createSlice } from "@reduxjs/toolkit";

// State shape
const initialState = {
  user: null, // { name, avatar }
  accessToken: null,
};

// State slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUserData: (state, action) => {
      const { name, avatar, accessToken } = action.payload;
      state.user = { name, avatar };
      state.accessToken = accessToken;
    },
    clearUserData: (state, action) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

// Actions
export const { loadUserData, clearUserData } = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;

export default authSlice.reducer;
