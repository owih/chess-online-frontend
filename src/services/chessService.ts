import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ChessGameRoom from '../types/chess/chessGameRoom';
import { updateStateFromApi } from '../store/reducers/ChessGameRoomSlice';
import ChessGameRoomRaw from '../types/chess/chessGameRoomRaw';
import ChessGameUpdatedMember from '../types/chess/chessGameUpdatedMember';

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
      transformResponse(base: ChessGameRoomRaw): ChessGameRoom {
        return { ...base, state: JSON.parse(base.state || 'null') };
      },
      async onQueryStarted(idm, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateStateFromApi(data));
        } catch (e) {
          console.log(e);
        }
      },
      providesTags: () => [{ type: 'Chess', id: 'current-game-state' }],
    }),
    sendUpdatedRoom: build.mutation<boolean, Partial<ChessGameRoom>>({
      query: (newState) => ({
        url: 'chess',
        method: 'POST',
        body: {
          ...newState,
          state: JSON.stringify(newState.state),
        },
      }),
    }),
    sendUpdatedMember: build.mutation<boolean, ChessGameUpdatedMember>({
      query: (newMemberState) => ({
        url: 'chess/member',
        method: 'POST',
        body: {
          ...newMemberState,
        },
      }),
    }),
  }),
});

export const { useStartChessGameQuery, useSendUpdatedRoomMutation, useSendUpdatedMemberMutation } = chessApi;
