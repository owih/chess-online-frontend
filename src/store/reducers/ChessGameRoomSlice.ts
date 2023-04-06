import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ChessGameRoom from '../../types/chess/chessGameRoom';
import ChessGameState from '../../types/chess/chessGameState';
import ChessGameProcess from '../../types/chess/chessGameProcess';

interface ChessGameRoomStore {
  gameId: string;
  state: ChessGameState | null;
  whitePlayerId: number | null;
  blackPlayerId: number | null;
  viewersId: number[];
  gameProcess: ChessGameProcess;
}

const initialState: ChessGameRoomStore = {
  gameId: '',
  state: null,
  whitePlayerId: null,
  blackPlayerId: null,
  viewersId: [],
  gameProcess: ChessGameProcess.ENDED,
};

const chessGameRoomSlice = createSlice({
  name: 'chess',
  initialState,
  reducers: {
    setGameState: (state, action: PayloadAction<ChessGameState>) => {
      console.log(action.payload, ' setChessGameState');
      state.state = action.payload;
    },
    setGameId: (state, action: PayloadAction<string>) => {
      state.gameId = action.payload;
    },
    setGameProcess: (state, action: PayloadAction<ChessGameProcess>) => {
      state.gameProcess = action.payload;
    },
    updateStateFromApi: (state, action: PayloadAction<ChessGameRoom>) => action.payload,
  },
});

const { actions, reducer } = chessGameRoomSlice;
export const {
  setGameState,
  setGameId,
  updateStateFromApi,
  setGameProcess,
} = actions;
export default reducer;
