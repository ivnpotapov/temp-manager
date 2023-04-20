import React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { FormBoardInputText } from 'components/FormBoardInputText';
import { useTranslate } from 'components/languageContext/languageContext';
import { useAlerts } from 'components/SnackbarPanel';
import { FormProvider, useForm } from 'react-hook-form';
import { useAppDispatch } from 'store/store';
import styles from './../../login/Login.module.scss';
import {
  addConfirmEditBoardFormCloseThunk,
  addConfirmEditTaskFormCloseThunk,
} from 'store/thunks/formThunk';
import { updateTaskThunk } from 'store/thunks/taskThunk';
import { UpdateTaskData } from 'services/taskServiceTypes';
import { CreateBoardData } from 'services/boardServiceTypes';

type FormProps = {
  setIsEditModalOpened: (x: boolean) => void;
  boardId: string;
  columnId: string;
  taskId: string;
  taskData: UpdateTaskData;
  asigneeId?: string;
};

export const EditTaskName = ({
  setIsEditModalOpened,
  boardId,
  columnId,
  taskId,
  taskData,
  asigneeId,
}: FormProps) => {
  const addAlert = useAlerts();
  const dispatch = useAppDispatch();
  const successEditBoard = useTranslate('alerts.successEditBoard');
  const errorEditBoard = useTranslate('alerts.errorEditBoard');
  const nameBoard = useTranslate('form.taskName');
  const descriptionBoard = useTranslate('form.boardDescriptoon');
  const submitBoardRequest = useTranslate('buttons.submit');
  const closeBoardCreateForm = useTranslate('buttons.close');
  const titleBoardCreateForm = useTranslate('buttons.editBoard');

  const methods = useForm({
    defaultValues: { title: '', order: 0, description: '', userId: '', boardId: '', columnId: '' },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const userIdTask = asigneeId as string;

  const onSubmit = async (taskDataInput: UpdateTaskData) => {
    const data = {
      title: taskDataInput.title,
      order: taskData.order,
      description: taskDataInput.description,
      userId: userIdTask,
      boardId: taskData.boardId,
      columnId: taskData.columnId,
    };

    // dispatch(addConfirmEditBoardFormCloseThunk());
    try {
      await dispatch(updateTaskThunk(boardId, columnId, taskId, data));
      addAlert({ type: 'success', message: successEditBoard });
      setIsEditModalOpened(false);
    } catch {
      addAlert({ type: 'error', message: errorEditBoard });
    }
    dispatch(addConfirmEditTaskFormCloseThunk());
  };

  return (
    <>
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
            setIsEditModalOpened(false), dispatch(addConfirmEditTaskFormCloseThunk());
          }}
          variant={'outlined'}
          color="error"
        >
          {closeBoardCreateForm}
        </Button>
      </Paper>
    </>
  );
};
