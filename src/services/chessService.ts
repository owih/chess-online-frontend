import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import User from '../types/user/user';
import { removeUser, setNotFirstUserFetching, setUserAuthorized } from '../store/reducers/UserSlice';

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
          dispatch(setUserAuthorized(data.id));
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
          dispatch(setUserAuthorized(data.id));
        } catch (e) {
          if (e && (typeof e === 'object') && 'status' in e && e.status === 401) {
            dispatch(removeUser());
          }
        }
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
