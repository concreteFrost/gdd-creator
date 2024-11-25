import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import gddSlice from "./slices/gddSlice";
import mechanicsSlice from "./slices/mechanicsSlice";
import modalSlice from "./slices/modalSlice";
import mechanicsTypeSlice from "./slices/mechanicsTypeSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["gddSlice", "mechanicsSlice", "mechanicsTypeSlice"],
};

const appReducer = combineReducers({
  gddSlice,
  mechanicsSlice,
  modalSlice,
  mechanicsTypeSlice,
});

const persistedReducer = persistReducer(persistConfig, appReducer);

export default persistedReducer;
