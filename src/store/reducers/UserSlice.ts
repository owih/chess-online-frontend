import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../../types/user/user';

const USER_INFO = 'user-info';

interface UserState {
  user: User | null;
  isAuthorized: boolean;
  isFirstLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthorized: false,
  isFirstLoading: true,
};

const localStorageData = localStorage.getItem(USER_INFO);

if (localStorageData) {
  initialState.user = JSON.parse(localStorageData);
  initialState.isAuthorized = true;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setNotFirstUserFetching: (state) => {
      state.isFirstLoading = false;
    },
    setUserData: (state, action: PayloadAction<User>) => {
      localStorage.setItem(USER_INFO, JSON.stringify(action.payload));
      state.user = action.payload;
      state.isAuthorized = true;
      state.isFirstLoading = false;
    },
    removeUser: () => {
      localStorage.setItem(USER_INFO, '');
      return { user: null, isAuthorized: false, isFirstLoading: false };
    },
  },
});

const { actions, reducer } = userSlice;
export const { setUserData, removeUser, setNotFirstUserFetching } = actions;
export default reducer;
