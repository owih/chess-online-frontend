import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import modalsReducer from './ModalsSlice';
import chessGameRoomReduces from './ChessGameRoomSlice';
import chessGameMembersReducer from './ChessGameMembers';
import { userApi } from '../../services/userService';
import { chessApi } from '../../services/chessService';

export const rootReducer = combineReducers({
  user: userReducer,
  chessGameRoom: chessGameRoomReduces,
  chessGameMembers: chessGameMembersReducer,
  modals: modalsReducer,
  [userApi.reducerPath]: userApi.reducer,
  [chessApi.reducerPath]: chessApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
