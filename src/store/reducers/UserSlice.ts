import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const USER_INFO = 'user-info';

interface UserState {
  id: number | null,
  isAuthorized: boolean;
  isFirstLoading: boolean;
}

const initialState: UserState = {
  id: null,
  isAuthorized: false,
  isFirstLoading: true,
};

if (localStorage.getItem(USER_INFO)) {
  initialState.id = JSON.parse(localStorage.getItem(USER_INFO) ?? '');
  initialState.isAuthorized = true;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setNotFirstUserFetching: (state: UserState) => {
      state.isFirstLoading = false;
    },
    setUserAuthorized: (state: UserState, action: PayloadAction<number>) => {
      localStorage.setItem(USER_INFO, JSON.stringify(action.payload));
      return { id: action.payload, isAuthorized: true, isFirstLoading: false };
    },
    removeUser: () => {
      localStorage.setItem(USER_INFO, '');
      return { id: null, isAuthorized: false, isFirstLoading: false };
    },
  },
});

const { actions, reducer } = userSlice;
export const { setUserAuthorized, removeUser, setNotFirstUserFetching } = actions;
export default reducer;
