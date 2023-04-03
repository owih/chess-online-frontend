import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ChessGameRoomTransformed from '../types/chess/chess-game-room-transformed';
import ChessGameRoom from '../types/chess/chess-game-room';

export const chessApi = createApi({
  reducerPath: 'chessApi',
  tagTypes: ['Chess'],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_BACKEND_URL }),
  endpoints: (build) => ({
    getChessGameRooms: build.query<ChessGameRoom, string>({
      query: () => 'chess/',
      providesTags: () => [{ type: 'Chess', id: 'current-game-state' }],
    }),
    startChessGame: build.query<ChessGameRoomTransformed, string>({
      query: (id) => `chess/start/${id}`,
      // async onQueryStarted(idm, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     console.log(data);
      //   } catch (e) {
      //     console.log(e);
      //   }
      // },
      providesTags: () => [{ type: 'Chess', id: 'current-game-state' }],
    }),
  }),
});

export const { useStartChessGameQuery } = chessApi;
// export const { useStartChessGameQuery } = chessApi;
