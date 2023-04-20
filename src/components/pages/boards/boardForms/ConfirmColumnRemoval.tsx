import React, { useEffect, useCallback } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { useTranslate } from 'components/languageContext/languageContext';
import { useAlerts } from 'components/SnackbarPanel';
import { useAppDispatch, useAppSelector } from 'store/store';
import styles from './../../login/Login.module.scss';
import { deleteColumnByIdThunk } from 'store/thunks/columnThunk';
import {
  addConfirmDeleteColumnFormCloseThunk,
  addConfirmEditColumnFormCloseThunk,
  addFormModalCloseThunk,
  addFormModalThunk,
} from 'store/thunks/formThunk';
type ConfirmProps = {
  setConfirmDeleteColumn: (e: boolean) => void;
  boardId: string;
  id: string;
};

export const ConfirmColumnRemoval = ({ setConfirmDeleteColumn, boardId, id }: ConfirmProps) => {
  const addAlert = useAlerts();
  const dispatch = useAppDispatch();
  const successDeleteColumn = useTranslate('alerts.successDelateColumn');
  const errorDeleteColumn = useTranslate('alerts.errorDelateColumn');
  const submitBoardRequest = useTranslate('buttons.submit');
  const closeBoardCreateForm = useTranslate('buttons.close');
  const titleDeleteForm = useTranslate('form.confirmDeleteColumn');
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await dispatch(deleteColumnByIdThunk(boardId, id));
      addAlert({ type: 'success', message: successDeleteColumn });
    } catch {
      addAlert({ type: 'error', message: errorDeleteColumn });
    }
    dispatch(addConfirmDeleteColumnFormCloseThunk());
  };
  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    setConfirmDeleteColumn(false);
    dispatch(addConfirmDeleteColumnFormCloseThunk());
  };
  return (
    <Paper
      style={{
        width: '50%',
        padding: '40px 20px',
        display: 'grid',
        gridRowGap: '20px',
        justifyItems: 'center',
        position: 'absolute',
        zIndex: 5,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Typography variant="h5" component="h5" sx={{ textAlign: 'center' }}>
        {titleDeleteForm}
      </Typography>

      <Button
        onClick={handleSubmit}
        className={styles.formButton}
        color="info"
        variant={'contained'}
      >
        {submitBoardRequest}
      </Button>
      <Button
        className={styles.formButton}
        onClick={handleCancel}
        variant={'outlined'}
        color="error"
      >
        {closeBoardCreateForm}
      </Button>
    </Paper>
  );
};
