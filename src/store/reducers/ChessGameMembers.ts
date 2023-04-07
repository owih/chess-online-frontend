import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../../types/user/user';

interface ChessGameMembersState {
  whitePlayer: User | null;
  blackPlayer: User | null;
  viewers: User[];
}

const initialState: ChessGameMembersState = {
  whitePlayer: null,
  blackPlayer: null,
  viewers: [],
};

const chessGameMembersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setViewers: (state, action: PayloadAction<User[]>) => {
      state.viewers = action.payload;
    },
    setViewer: (state, action: PayloadAction<User>) => {
      state.viewers.push(action.payload);
    },
    setWhitePlayer: (state, action: PayloadAction<User>) => {
      state.whitePlayer = action.payload;
    },
    setBlackPlayer: (state, action: PayloadAction<User>) => {
      state.blackPlayer = action.payload;
    },
    removeUserFromEvery: (state, action: PayloadAction<number>) => {
      if (state.whitePlayer && state.whitePlayer.id === action.payload) {
        state.whitePlayer = null;
      }
      if (state.blackPlayer && state.blackPlayer.id === action.payload) {
        state.blackPlayer = null;
      }
      state.viewers.filter((item) => item.id !== action.payload);
    },
  },
});

const { actions, reducer } = chessGameMembersSlice;
export const {
  setViewers, setWhitePlayer, setBlackPlayer, setViewer, removeUserFromEvery,
} = actions;
export default reducer;
