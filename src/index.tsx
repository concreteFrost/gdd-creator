import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "@store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const persistor = persistStore(store); // Создаем persistor

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
