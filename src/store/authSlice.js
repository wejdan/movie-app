import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserData } from "../services/auth";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (token, thunkAPI) => {
    try {
      const results = await getUserData(token);
      return results;
    } catch (error) {
      if (error.message === "user dose not exist") {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  userData: null,
  error: null,
  isAuthenticating: false,
  token: null,
  isAdmin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      const { payload } = action;
      state.user = payload.user;

      //  console.log('newState', state);
    },
    setIsAuthenticating: (state, action) => {
      const { payload } = action;
      state.isAuthenticating = payload.isAuthenticating;

      //  console.log('newState', state);
    },

    logout: (state, action) => {
      state.user = null;
      state.userData = null;
      state.isAuthenticating = false;
      state.token = null; // Clear the stored token
      state.isAdmin = false;
      // state.didTryAutoLogin = false;
    },
    setUserData: (state, action) => {
      const { payload } = action;

      state.userData = { ...state.userData, ...payload.userData };
      state.isAuthenticating = false;
      // state.didTryAutoLogin = false;
    },
    setIsAdmin: (state, action) => {
      const { payload } = action;

      state.isAdmin = payload.isAdmin;
      // state.didTryAutoLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.isAuthenticating = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload?.user;
        state.isAdmin = action.payload?.isAdmin;
        state.isAuthenticating = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.user = null;
        state.userData = null;
        state.isAuthenticating = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  authenticate,
  logout,
  setUserData,
  setIsAdmin,
  setIsAuthenticating,
} = authSlice.actions;

export default authSlice.reducer;
