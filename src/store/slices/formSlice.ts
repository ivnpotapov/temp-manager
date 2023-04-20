import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FormInitialState = {
  formAddBoard: boolean;
  formAddColumn: boolean;
  formAddTask: boolean;
  formModal: boolean;
  confirmDeleteBoard: boolean;
  confirmDeleteColumn: boolean;
  confirmDeleteTask: boolean;
  confirmEditBoard: boolean;
  confirmEditColumn: boolean;
  confirmEditTask: boolean;
};
const initialState: FormInitialState = {
  formAddBoard: false,
  formAddColumn: false,
  formAddTask: false,
  formModal: false,
  confirmDeleteBoard: false,
  confirmEditBoard: false,
  confirmDeleteColumn: false,
  confirmEditColumn: false,
  confirmDeleteTask: false,
  confirmEditTask: false,
};
export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setAddBoard: (state, action: PayloadAction<boolean>) => {
      state.formAddBoard = action.payload;
    },
    setConfirmEditBoard: (state, action: PayloadAction<boolean>) => {
      state.confirmEditBoard = action.payload;
    },
    setConfirmDeleteBoard: (state, action: PayloadAction<boolean>) => {
      state.confirmDeleteBoard = action.payload;
    },
    setConfirmDeleteTask: (state, action: PayloadAction<boolean>) => {
      state.confirmDeleteTask = action.payload;
    },
    setFormModal: (state, action: PayloadAction<boolean>) => {
      state.formModal = action.payload;
    },
    setAddColumn: (state, action: PayloadAction<boolean>) => {
      state.formAddColumn = action.payload;
    },
    setConfirmDeleteColumn: (state, action: PayloadAction<boolean>) => {
      state.confirmDeleteColumn = action.payload;
    },
    setConfirmEditColumn: (state, action: PayloadAction<boolean>) => {
      state.confirmEditColumn = action.payload;
    },
    setConfirmEditTask: (state, action: PayloadAction<boolean>) => {
      state.confirmEditTask = action.payload;
    },
    setAddTask: (state, action: PayloadAction<boolean>) => {
      state.formAddTask = action.payload;
    },
  },
});
