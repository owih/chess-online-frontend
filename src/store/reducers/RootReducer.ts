import { combineReducers } from '@reduxjs/toolkit';
import chessReducer from './ChessSlice';

const rootReducer = combineReducers({
  chessReducer,
});

export default rootReducer;
