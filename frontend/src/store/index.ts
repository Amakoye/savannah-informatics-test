import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  PersistConfig,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import albums from "./slices/albums";
import auth from "./slices/auth";

const reducer = combineReducers({
  auth,
  albums,
} as const);

const persistConfig: Omit<PersistConfig<State>, "blacklist" | "whitelist"> &
  Partial<Record<"blacklist" | "whitelist", (keyof State)[]>> = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig as any, reducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const useDispatch = () => store.dispatch;

const persistor = persistStore(store);

export type Dispatch = typeof store.dispatch;
export type State = ReturnType<typeof reducer>;
declare global {
  export type State = ReturnType<typeof reducer>;
}

export { persistor, store, useDispatch };
