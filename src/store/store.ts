import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/RootReducer';
import { userApi } from '../services/userService';
import { chessApi } from '../services/chessService';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(userApi.middleware, chessApi.middleware)
  ),
});

export type AppDispatch = typeof store.dispatch;
