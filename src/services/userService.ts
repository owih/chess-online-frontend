import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import User from '../types/user/user';
import {
  removeUser, setNotFirstUserFetching, setUserData,
} from '../store/reducers/UserSlice';
import { setBlackPlayer, setViewers, setWhitePlayer } from '../store/reducers/ChessGameMembers';
import Colors from '../models/chess/Colors';

const fetchUserCount = 0;

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_BACKEND_URL }),
  endpoints: (build) => ({
    getUser: build.query<User, number>({
      query: (id) => `user/${id}`,
      async onQueryStarted(idm, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserData(data));
          if (!fetchUserCount) {
            dispatch(setNotFirstUserFetching());
          }
        } catch (e) {
          if (e && (typeof e === 'object') && 'status' in e && e.status === 401) {
            dispatch(removeUser());
          }
        }
      },
      providesTags: () => [{ type: 'User', id: 'current-user' }],
    }),
    getPlayer: build.query<User, { id: number | null, color: Colors }>({
      query: (args) => `user/${args.id}`,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled;
          if (args.color === Colors.WHITE) {
            dispatch(setWhitePlayer(user));
            return;
          }
          dispatch(setBlackPlayer(user));
        } catch (e) {
          console.log(e);
        }
      },
      providesTags: () => [{ type: 'User', id: 'current-user' }],
    }),
    getManyUsers: build.query<User[], number[]>({
      query: (idList) => ({
        url: 'user/many',
        method: 'POST',
        body: {
          idList,
        },
      }),
      async onQueryStarted(idm, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data, ' many users');
          dispatch(setViewers(data));
        } catch (e) {
          console.log(e);
        }
      },
    }),
    createUser: build.mutation<User, string>({
      query: (name) => ({
        url: 'user',
        method: 'POST',
        body: {
          name,
        },
      }),
      async onQueryStarted(idm, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserData(data));
        } catch (e) {
          if (e && (typeof e === 'object') && 'status' in e && e.status === 401) {
            dispatch(removeUser());
          }
        }
      },
      async onCacheEntryAdded() {
        console.log('cache');
      },
    }),
    changeUserSettings: build.mutation<User, User>({
      query: (user) => ({
        url: 'user',
        method: 'PUT',
        body: {
          ...user,
        },
      }),
      invalidatesTags: [{ type: 'User', id: 'current-user' }],
    }),
  }),
});

export const { useGetUserQuery, useCreateUserMutation, useChangeUserSettingsMutation } = userApi;
export const { useGetManyUsersQuery, useGetPlayerQuery } = userApi;
