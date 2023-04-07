import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ChessGameRoom from '../../types/chess/chessGameRoom';
import ChessGameState from '../../types/chess/chessGameState';
import ChessGameProcess from '../../types/chess/chessGameProcess';
import Colors from '../../models/chess/Colors';
import ChessGameMemberEvent from '../../types/chess/chessGameMemberEvent';
import ChessGameViewers from '../../types/chess/chessGameViewers';

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
    setWhitePlayerId: (state, action: PayloadAction<number | null>) => {
      console.log(action.payload, ' set white player');
      state.whitePlayerId = action.payload;
    },
    setBlackPlayerId: (state, action: PayloadAction<number | null>) => {
      console.log(action.payload, ' set black player');
      state.blackPlayerId = action.payload;
    },
    setViewerFromWebsocket: (state, action: PayloadAction<ChessGameViewers>) => {
      console.log(action.payload, ' set black player');
      const { userId, event } = action.payload;
      if (event === ChessGameMemberEvent.JOIN) {
        if (state.whitePlayerId === userId) {
          state.whitePlayerId = null;
        }
        if (state.blackPlayerId === userId) {
          state.blackPlayerId = null;
        }
        state.viewersId.push(userId);
      }
      if (event === ChessGameMemberEvent.LEAVE) {
        state.viewersId = state.viewersId.filter((item) => item !== userId);
      }
    },
    setPlayerFromWebsocket: (
      state,
      action: PayloadAction<{ userId: number | null, color: Colors, event: ChessGameMemberEvent }>,
    ) => {
      const { userId, color, event } = action.payload;
      if (color === Colors.WHITE && event === ChessGameMemberEvent.JOIN) {
        if (state.blackPlayerId === userId) {
          state.blackPlayerId = null;
        }
        state.viewersId = state.viewersId.filter((item) => item !== userId);
        state.whitePlayerId = userId;
        console.log(state.viewersId);
        return;
      }
      if (color === Colors.WHITE && event === ChessGameMemberEvent.LEAVE) {
        state.whitePlayerId = null;
        return;
      }
      if (color === Colors.BLACK && event === ChessGameMemberEvent.JOIN) {
        if (state.whitePlayerId === userId) {
          state.whitePlayerId = null;
        }
        state.viewersId = state.viewersId.filter((item) => item !== userId);
        state.blackPlayerId = userId;
        return;
      }
      if (color === Colors.BLACK && event === ChessGameMemberEvent.LEAVE) {
        state.blackPlayerId = null;
      }
    },
    setViewersId: (state, action: PayloadAction<number[]>) => {
      state.viewersId = action.payload;
    },
    setUserToViewers: (state, action: PayloadAction<number>) => {
      if (state.viewersId.includes(action.payload)) {
        return;
      }
      state.viewersId.push(action.payload);
    },
    removeUserFromViewersId: (state, action: PayloadAction<number>) => {
      state.viewersId = state.viewersId.filter((item) => item !== action.payload);
    },
    removeUserFromWhitePlayerId: (state, action: PayloadAction<number>) => {
      if (state.whitePlayerId === action.payload) {
        state.whitePlayerId = null;
      }
    },
    removeUserFromBlackPlayerId: (state, action: PayloadAction<number>) => {
      if (state.blackPlayerId === action.payload) {
        state.blackPlayerId = null;
      }
    },
    removeUserIdFromEvery: (state, action: PayloadAction<number>) => {
      if (state.blackPlayerId === action.payload) {
        state.blackPlayerId = null;
      }
      if (state.whitePlayerId === action.payload) {
        state.whitePlayerId = null;
      }
      if (state.viewersId.includes(action.payload)) {
        state.viewersId = state.viewersId.filter((item) => item !== action.payload);
      }
    },
    updateStateFromApi: (state, action: PayloadAction<ChessGameRoom>) => action.payload,
  },
});

const { actions, reducer } = chessGameRoomSlice;
export const {
  setGameState,
  setGameId,
  setWhitePlayerId,
  setUserToViewers,
  removeUserFromViewersId,
  setBlackPlayerId,
  setViewersId,
  setViewerFromWebsocket,
  updateStateFromApi,
  removeUserFromBlackPlayerId,
  setPlayerFromWebsocket,
  removeUserIdFromEvery,
  removeUserFromWhitePlayerId,
  setGameProcess,
} = actions;
export default reducer;
