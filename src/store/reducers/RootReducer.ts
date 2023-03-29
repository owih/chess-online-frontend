import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import modalsReducer from './ModalsSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  modals: modalsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
