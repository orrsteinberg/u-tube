import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase/app";

import auth from "../../firebase";

// State shape
const initialState = {
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  accessToken: null,
  user: null, // { name, avatar }
  error: null,
};

// Async thunks
export const login = createAsyncThunk("auth/login", async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");

  const authResponse = await auth.signInWithPopup(provider);
  return {
    credential: authResponse.credential,
    profile: authResponse.additionalUserInfo.profile,
  };
});

// State slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    // Using Immer under the hood so we're not mutating the actual state
    [login.pending]: (state, action) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state, action) => {
      state.status = "succeeded";

      const { credential, profile } = action.payload;

      state.accessToken = credential.accessToken;
      state.user = {
        name: profile.name,
        avatar: profile.picture,
      };
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;

export default authSlice.reducer;
