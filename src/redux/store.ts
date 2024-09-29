import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import baseApi from "./api/baseApi";
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
import userSlice from "./features/users/userSlice";
import filterSlice from "./features/services/filterSlice";
import reviewsSlice from "./features/reviews/reviewsSlice";
import bookingSlice from "./features/bookings/bookingSlice";
import ServiceSlice from "./features/services/ServiceSlice";
import slotSlice from "./features/slots/slotSlice";

// redux persistor
const persistConfig = {
  key: "auth",
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, authReducer);

// store
const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedReducer,
    users: userSlice,
    filters: filterSlice,
    reviews: reviewsSlice,
    bookings: bookingSlice,
    services: ServiceSlice,
    slots: slotSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
export const persistor = persistStore(store);
