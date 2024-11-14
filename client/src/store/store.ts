import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import gddSlice from "./slices/gddSlice";

const logger = createLogger({
  level: "info",
  collapsed: true,
  duration: true,
  timestamp: true,
  logErrors: true,
  diff: false,
  predicate: (getState, action) => true,
});

const store = configureStore({
  reducer: {
    gddSlice: gddSlice,
  },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV === "development") {
      return getDefaultMiddleware().concat(logger);
    }
    return getDefaultMiddleware();
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
