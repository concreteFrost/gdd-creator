import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import gddSlice from "./slices/gddSlice";
import mechanicsSlice from "./slices/mechanicsSlice";
import modalSlice from "./slices/modalSlice";
import mechanicsTypeSlice from "./slices/mechanicsTypeSlice";
import gameplaySlice from "./slices/gameplaySlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "gddSlice",
    "mechanicsSlice",
    "mechanicsTypeSlice",
    "gameplaySlice",
  ],
};

const appReducer = combineReducers({
  gddSlice,
  mechanicsSlice,
  modalSlice,
  mechanicsTypeSlice,
  gameplaySlice,
});

const persistedReducer = persistReducer(persistConfig, appReducer);

export default persistedReducer;
