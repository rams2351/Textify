import { combineReducers } from "@reduxjs/toolkit";
import { PersistConfig } from "redux-persist";
import { fileSystemSlice } from "./fileSystemSlice";

const isClient = typeof window !== "undefined";

let mainReducer;

const rootReducer = combineReducers({
  fileSystem: fileSystemSlice.reducer,
});

if (isClient) {
  const { persistReducer } = require("redux-persist");
  const storage = require("redux-persist/lib/storage").default;

  const persistConfig: PersistConfig<any> = {
    key: "root",
    version: 1,
    storage: storage,
    whitelist: ["fileSystem"],
  };

  mainReducer = persistReducer(persistConfig, rootReducer);
} else {
  mainReducer = rootReducer;
}

export const actions = {
  ...fileSystemSlice.actions,
};

export const persistedReducer = mainReducer;
