import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Colors from '../../models/chess/Colors';
import ChessGameRoom from '../../types/chess/chess-game-room';

interface ChessGameRoomStore {
  gameId: string;
  state: string;
  whitePlayerId: number | null;
  blackPlayerId: number | null;
  currentPlayer: Colors;
  viewersId: number[];
}

const initialState: ChessGameRoomStore = {
  gameId: '',
  state: '',
  currentPlayer: Colors.WHITE,
  whitePlayerId: null,
  blackPlayerId: null,
  viewersId: [],
};

const chessGameRoomSlice = createSlice({
  name: 'chess',
  initialState,
  reducers: {
    setState: (state: ChessGameRoomStore, action: PayloadAction<string>) => {
      state.state = action.payload;
    },
    setGameId: (state: ChessGameRoomStore, action: PayloadAction<string>) => {
      state.gameId = action.payload;
    },
    setCurrentPlayer: (state: ChessGameRoomStore, action: PayloadAction<Colors>) => {
      state.currentPlayer = action.payload;
    },
    toggleCurrentPlayer: (state: ChessGameRoomStore) => {
      state.currentPlayer = state.currentPlayer === Colors.WHITE
        ? Colors.BLACK
        : Colors.WHITE;
    },
    updateStateFromApi: (state, action: PayloadAction<ChessGameRoom>) => {
      state = { ...action.payload };
    },
  },
});

const { actions, reducer } = chessGameRoomSlice;
export const {
  setState, setGameId, setCurrentPlayer, toggleCurrentPlayer, updateStateFromApi,
} = actions;
export default reducer;
