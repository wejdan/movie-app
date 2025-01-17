import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import appSettingsSlice from "./appSettingsSlice";
function safeParse(item) {
  const itemRaw = localStorage.getItem(item);
  if (!itemRaw) {
    // Item does not exist in localStorage
    console.log(`${item} does not exist in localStorage.`);
    return undefined; // Explicitly return undefined for clarity
  }
  try {
    return JSON.parse(itemRaw);
  } catch (error) {
    console.error(`Error parsing ${item} from localStorage:`, error);
    localStorage.removeItem(item); // Remove corrupt item
    return undefined;
  }
}
const preloadedState = {
  auth: safeParse("auth"),
  appSettings: safeParse("appSettings"),
};
const appSettingsMiddleware = (store) => (next) => (action) => {
  // Example action types, adjust based on your actual appSettingsSlice action types
  if (action.type.startsWith("appSettings/")) {
    const nextState = next(action); // Apply the action
    const state = store.getState(); // Get the updated state
    // Persist the appSettings part of the state to localStorage
    localStorage.setItem("appSettings", JSON.stringify(state.appSettings));
    return nextState;
  }

  return next(action);
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
    appSettings: appSettingsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["appSettings/updateSettings"], // Example, adjust based on your action types
      },
    }).concat(authMiddleware, appSettingsMiddleware),
  preloadedState, // Correctly placed inside the configuration object
});
