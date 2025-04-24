// import { configureStore } from '@reduxjs/toolkit';
// import postsReducer from './posts/postsSlice';

// export const store = configureStore({
//   reducer: {
//     posts: postsReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// src/redux/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import postsReducer from './posts/postsSlice';

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage

/* --- root reducer --- */
const rootReducer = combineReducers({
  posts: postsReducer,
});

/* --- persist config --- */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['posts'],         // ⬅️ only persist the posts slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* --- store --- */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignore redux‑persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

/* --- persistor --- */
export const persistor = persistStore(store);

/* --- types --- */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
