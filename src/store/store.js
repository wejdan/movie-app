import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
const preloadedState = {
  auth: JSON.parse(localStorage.getItem("auth")) || undefined,
};
const authMiddleware = (store) => (next) => (action) => {
  if (action.type === "auth/authenticate") {
    // Assuming the action payload contains the auth token or user data
    localStorage.setItem("auth", JSON.stringify(action.payload));
  } else if (action.type === "auth/logout") {
    localStorage.removeItem("auth");
  }

  return next(action);
};

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authMiddleware),
  preloadedState, // Correctly placed inside the configuration object
});
