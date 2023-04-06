import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ChessGameRoom from '../types/chess/chessGameRoom';
import { updateStateFromApi } from '../store/reducers/ChessGameRoomSlice';

export const chessApi = createApi({
  reducerPath: 'chessApi',
  tagTypes: ['Chess'],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_BACKEND_URL }),
  endpoints: (build) => ({
    getChessGameRooms: build.query<ChessGameRoom[], string>({
      query: () => 'chess/',
      providesTags: () => [{ type: 'Chess', id: 'current-game-state' }],
    }),
    startChessGame: build.query<ChessGameRoom, string>({
      query: (id) => `chess/start/${id}`,
      async onQueryStarted(idm, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateStateFromApi(data));
          console.log(data);
        } catch (e) {
          console.log(e);
        }
      },
      providesTags: () => [{ type: 'Chess', id: 'current-game-state' }],
    }),
    sendUpdatedRoom: build.mutation<boolean, ChessGameRoom>({
      query: (state) => ({
        url: 'chess',
        method: 'POST',
        body: {
          state,
        },
      }),
    }),
  }),
});

export const { useStartChessGameQuery, useSendUpdatedRoomMutation } = chessApi;
