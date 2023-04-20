import { Button, Paper, Typography } from '@mui/material';
import { FormBoardInputText } from 'components/FormBoardInputText';
import { useTranslate } from 'components/languageContext/languageContext';
import { useAlerts } from 'components/SnackbarPanel';
import { WrapperWaiting } from 'components/utils/WrapperWaiting';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateBoardData } from 'services/boardServiceTypes';
import { useAppDispatch, useAppSelector } from 'store/store';
import { createNewBoardThunk } from 'store/thunks/boardThunk';
import { addBoardFormCloseThunk } from 'store/thunks/formThunk';
import styles from './../../login/Login.module.scss';

// type FormProps = {
//   setPopupFormAddBoard: (x: boolean) => void;
// };

export const AddBoardForm = () => {
  const addAlert = useAlerts();
  const dispatch = useAppDispatch();
  const successCreateBoard = useTranslate('alerts.successCreateBoard');
  const errorCreateBoard = useTranslate('alerts.errorCreateBoard');
  const nameBoard = useTranslate('form.boardName');
  const descriptionBoard = useTranslate('form.boardDescriptoon');
  const submitBoardRequest = useTranslate('buttons.submit');
  const closeBoardCreateForm = useTranslate('buttons.close');
  const titleBoardCreateForm = useTranslate('form.titleCreateBoard');
  const userId = useAppSelector((state) => state.user.user!._id);

  const methods = useForm({
    defaultValues: { title: '' },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: { title: string }) => {
    try {
      await dispatch(createNewBoardThunk({ title: data.title, owner: userId, users: [userId] }));
      addAlert({ type: 'success', message: successCreateBoard });
      // setPopupFormAddBoard(false);
      dispatch(addBoardFormCloseThunk());
      // navigate('/boards');
    } catch {
      addAlert({ type: 'error', message: errorCreateBoard });
    }
  };

  const handleClose = () => {
    dispatch(addBoardFormCloseThunk());
  };

  return (
    <WrapperWaiting>
      <Paper
        style={{
          width: '50%',
          padding: '20px',
          display: 'grid',
          gridRowGap: '20px',
          justifyItems: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 3,
        }}
      >
        <Typography variant="h4" component="h4">
          {titleBoardCreateForm}
        </Typography>
        <FormProvider {...methods}>
          <FormBoardInputText name="title" label={nameBoard} type="text" />
          {/* <FormBoardInputText name="description" label={descriptionBoard} type="text" /> */}
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
          onClick={
            handleClose
            //   () => {
            //   setPopupFormAddBoard(false);
            // }
          }
          variant={'outlined'}
          color="error"
        >
          {closeBoardCreateForm}
        </Button>
      </Paper>
    </WrapperWaiting>
  );
};
