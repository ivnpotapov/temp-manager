import React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { FormBoardInputText } from 'components/FormBoardInputText';
import { useTranslate } from 'components/languageContext/languageContext';
import { useAlerts } from 'components/SnackbarPanel';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateBoardData } from 'services/boardServiceTypes';
import { useAppDispatch, useAppSelector } from 'store/store';
import { updateBoardThunk } from 'store/thunks/boardThunk';
import styles from './../../login/Login.module.scss';
import { addConfirmEditBoardFormCloseThunk } from 'store/thunks/formThunk';

type FormProps = {
  setEditFormBoard: (x: string) => void;
  id: string;
};

export const EditBoardForm = ({ setEditFormBoard, id }: FormProps) => {
  const confirmEditBoard = useAppSelector((state) => state.form.confirmEditBoard);

  const addAlert = useAlerts();
  const dispatch = useAppDispatch();
  const successEditBoard = useTranslate('alerts.successEditBoard');
  const errorEditBoard = useTranslate('alerts.errorEditBoard');
  const nameBoard = useTranslate('form.boardName');
  const descriptionBoard = useTranslate('form.boardDescriptoon');
  const submitBoardRequest = useTranslate('buttons.submit');
  const closeBoardCreateForm = useTranslate('buttons.close');
  const titleBoardCreateForm = useTranslate('buttons.editBoard');

  const valueInputBoardCard = useAppSelector((state) => state.board.allBoardsList);
  const value = valueInputBoardCard?.find((board) => board._id === id);

  const methods = useForm({
    defaultValues: { title: '', owner: '', users: [''] },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: CreateBoardData) => {
    dispatch(addConfirmEditBoardFormCloseThunk());
    try {
      await dispatch(updateBoardThunk(id, data));
      addAlert({ type: 'success', message: successEditBoard });
      setEditFormBoard('');
    } catch {
      addAlert({ type: 'error', message: errorEditBoard });
    }
  };

  return (
    <>
      {confirmEditBoard ? (
        <Paper
          style={{
            width: '50%',
            padding: '20px',
            display: 'grid',
            gridRowGap: '20px',
            justifyItems: 'center',
            position: 'absolute',
            zIndex: 5,
            left: '20%',
            top: '20%',
          }}
        >
          <Typography variant="h4" component="h4">
            {titleBoardCreateForm}
          </Typography>
          <FormProvider {...methods}>
            <FormBoardInputText name="title" label={nameBoard} type="text" />
            <FormBoardInputText name="description" label={descriptionBoard} type="text" />
          </FormProvider>

          <Button
            onClick={handleSubmit(onSubmit)}
            className={styles.formButton}
            color="info"
            variant={'contained'}
            disabled={isSubmitting}
          >
            {submitBoardRequest}
          </Button>
          <Button
            className={styles.formButton}
            onClick={() => {
              setEditFormBoard(''), dispatch(addConfirmEditBoardFormCloseThunk());
            }}
            variant={'outlined'}
            color="error"
          >
            {closeBoardCreateForm}
          </Button>
        </Paper>
      ) : null}
    </>
  );
};
