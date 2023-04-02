import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import modalsReducer from './ModalsSlice';
import { userApi } from '../../services/userService';

export const rootReducer = combineReducers({
  user: userReducer,
  [userApi.reducerPath]: userApi.reducer,
  modals: modalsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
