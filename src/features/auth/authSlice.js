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
  const provider = new firebase.auth.GoogleAuthProvider().addScope(
    "https://www.googleapis.com/auth/youtube.force-ssl"
  );

  const authResponse = await auth.signInWithPopup(provider);

  const { accessToken } = authResponse.credential;
  const { displayName, photoURL } = authResponse.user;

  return { accessToken, displayName, photoURL };
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await auth.signOut();
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

      const { accessToken, displayName, photoURL } = action.payload;

      state.accessToken = accessToken;
      state.user = {
        name: displayName,
        avatar: photoURL,
      };
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [logout.fulfilled]: (state, action) => {
      state.status = "idle";
      state.error = null;
      state.accessToken = null;
      state.user = null;
    },
  },
});

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;

export default authSlice.reducer;
