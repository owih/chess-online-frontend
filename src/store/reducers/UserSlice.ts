import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  users: string;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: 'as',
  isLoading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState) => {
      state.users = 'asds';
    },
  },
});

const { actions, reducer } = userSlice;
export const { setUser } = actions;
export default reducer;
