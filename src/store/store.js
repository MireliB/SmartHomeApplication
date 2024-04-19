import { combineReducers, configureStore } from "@reduxjs/toolkit";
import roomReducer from "../slice/roomSlice";
import deviceReducer from "../slice/deviceSlice";
import storage from "redux-persist/lib/storage";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "smartHome",
  storage,
};

const rootReducer = combineReducers({
  rooms: roomReducer,
  devices: deviceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistorStore = persistStore(store);

setTimeout(() => {
  persistorStore.purge();
}, 1000 * 60 * 60 * 24 * 14);

export default store;
