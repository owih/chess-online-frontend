import { createSlice } from '@reduxjs/toolkit';
import ModalsStore from '../../types/app/Modal/modalsStore';
import ModalName from '../../types/app/Modal/modalName';

const initialState: ModalsStore = {
  [ModalName.AUTH]: {
    name: ModalName.AUTH,
    isOpen: false,
  },
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggle: (state: ModalsStore): void => {
      state.auth.isOpen = !state.auth.isOpen;
    },
  },
});

const { actions, reducer } = modalsSlice;
// Extract and export each action creator by name
export const { toggle } = actions;
// Export the reducer, either as a default or named export
export default reducer;
