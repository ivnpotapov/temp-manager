import { formSlice } from 'store/slices/formSlice';
import { AppDispatch } from 'store/store';

export const addBoardFormOpenThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setAddBoard(true));
};
export const addBoardFormCloseThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setAddBoard(false));
};
export const addConfirmDeleteBoardFormThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setConfirmDeleteBoard(true));
};
export const addConfirmDeleteBoardFormCloseThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setConfirmDeleteBoard(false));
};
export const addConfirmEditBoardFormThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setConfirmEditBoard(true));
};
export const addConfirmEditBoardFormCloseThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setConfirmEditBoard(false));
};
export const addColumnFormOpenThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setAddColumn(true));
};
export const addColumnFormCloseThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setAddColumn(false));
};
export const addConfirmDeleteColumnFormThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setConfirmDeleteColumn(true));
};
export const addConfirmDeleteColumnFormCloseThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setConfirmDeleteColumn(false));
};
export const addConfirmEditColumnFormThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setConfirmEditColumn(true));
};
export const addConfirmEditColumnFormCloseThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setConfirmEditColumn(false));
};
export const addTaskFormOpenThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setAddTask(true));
};
export const addTaskFormCloseThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setAddTask(false));
};
export const addConfirmDeleteTaskFormThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setConfirmDeleteTask(true));
};
export const addConfirmDeleteTaskFormCloseThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setConfirmDeleteTask(false));
};
export const addConfirmEditTaskFormThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setConfirmEditTask(true));
};
export const addConfirmEditTaskFormCloseThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setConfirmEditTask(false));
};
export const addFormModalThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setFormModal(true));
};
export const addFormModalCloseThunk = () => (dispatch: AppDispatch) => {
  dispatch(formSlice.actions.setFormModal(false));
};
