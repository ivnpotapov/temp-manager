import { Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store';
import {
  addBoardFormCloseThunk,
  addColumnFormCloseThunk,
  addConfirmDeleteBoardFormCloseThunk,
  addConfirmDeleteColumnFormCloseThunk,
  addConfirmDeleteTaskFormCloseThunk,
  addConfirmEditBoardFormCloseThunk,
  addConfirmEditColumnFormCloseThunk,
  addConfirmEditTaskFormCloseThunk,
  addFormModalCloseThunk,
  addFormModalThunk,
  addTaskFormCloseThunk,
} from 'store/thunks/formThunk';

export default function FormModal() {
  const dispatch = useAppDispatch();
  const formAddBoard = useAppSelector((state) => state.form.formAddBoard);
  const confirmDeleteBoard = useAppSelector((state) => state.form.confirmDeleteBoard);
  const confirmEditBoard = useAppSelector((state) => state.form.confirmEditBoard);
  const confirmDeleteColumn = useAppSelector((state) => state.form.confirmDeleteColumn);
  const confirmEditColumn = useAppSelector((state) => state.form.confirmEditColumn);
  const formAddColumn = useAppSelector((state) => state.form.formAddColumn);
  const formAddTask = useAppSelector((state) => state.form.formAddTask);
  const confirmDeleteTask = useAppSelector((state) => state.form.confirmDeleteTask);
  const confirmEditTask = useAppSelector((state) => state.form.confirmEditTask);
  const openModal =
    formAddBoard ||
    formAddColumn ||
    confirmDeleteBoard ||
    confirmEditBoard ||
    formAddTask ||
    confirmDeleteColumn ||
    confirmEditColumn ||
    confirmDeleteTask ||
    confirmEditTask;

  useEffect(() => {
    openModal ? dispatch(addFormModalThunk()) : dispatch(addFormModalCloseThunk());
  }, [openModal]);
  const close = () => {
    formAddBoard ? dispatch(addBoardFormCloseThunk()) : null;
    confirmDeleteBoard ? dispatch(addConfirmDeleteBoardFormCloseThunk()) : null;
    confirmEditBoard ? dispatch(addConfirmEditBoardFormCloseThunk()) : null;
    formAddColumn ? dispatch(addColumnFormCloseThunk()) : null;
    confirmDeleteColumn ? dispatch(addConfirmDeleteColumnFormCloseThunk()) : null;
    confirmEditColumn ? dispatch(addConfirmEditColumnFormCloseThunk()) : null;
    confirmDeleteTask ? dispatch(addConfirmDeleteTaskFormCloseThunk()) : null;
    confirmEditTask ? dispatch(addConfirmEditTaskFormCloseThunk()) : null;
    formAddTask ? dispatch(addTaskFormCloseThunk()) : null;
    dispatch(addFormModalCloseThunk());
  };
  return (
    <Paper
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#0000009e',
        position: 'absolute',
        zIndex: 2,
      }}
      onClick={close}
    />
  );
}
