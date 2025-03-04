import { configureStore, Store } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  Persistor,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import { AppState } from "types";
import { persistedReducer } from "./slices/reducer";

export const store: Store<AppState> = configureStore<AppState, any, any>({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor: Persistor = persistStore(store);
