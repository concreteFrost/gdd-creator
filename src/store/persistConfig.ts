import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import gddSlice from "./slices/gddSlice";
import mechanicsSlice from "./slices/mechanicsSlice";
import modalSlice from "./slices/modalSlice";
import mechanicsTypeSlice from "./slices/mechanicsTypeSlice";
import gameplaySlice from "./slices/gameplaySlice";
import locationsSlice from "./slices/locationsSlice";
import charactersSlice from "./slices/characterSlices";
import localisationSlice from "./slices/localisationSlice";
import authSlice from "./slices/authSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authSlice", "localisationSlice"],
};

const appReducer = combineReducers({
  authSlice,
  gddSlice,
  mechanicsSlice,
  modalSlice,
  mechanicsTypeSlice,
  gameplaySlice,
  locationsSlice,
  charactersSlice,
  localisationSlice,
});

const persistedReducer = persistReducer(persistConfig, appReducer);

export default persistedReducer;
