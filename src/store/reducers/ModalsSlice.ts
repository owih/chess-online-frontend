import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ModalsStore from '../../types/app/Modal/modalsStore';
import ModalName from '../../types/app/Modal/modalName';

const initialState: ModalsStore = {
  [ModalName.AUTH]: {
    name: ModalName.AUTH,
    isOpen: false,
  },
  [ModalName.SETTINGS]: {
    name: ModalName.SETTINGS,
    isOpen: false,
  },
  [ModalName.INFO]: {
    name: ModalName.INFO,
    isOpen: false,
  },
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggle: (state: ModalsStore, action: PayloadAction<ModalName>): void => {
      state[action.payload].isOpen = !state[action.payload].isOpen;
    },
  },
});

const { actions, reducer } = modalsSlice;
// Extract and export each action creator by name
export const { toggle } = actions;
// Export the reducer, either as a default or named export
export default reducer;
