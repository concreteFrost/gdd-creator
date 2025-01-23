import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import persistedReducer from "./persistConfig";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist/es/constants";

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
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Исключаем действия redux-persist
      },
    });

    if (process.env.NODE_ENV === "development") {
      return middleware.concat(logger); // Добавляем logger только в dev-режиме
    }

    return middleware;
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
