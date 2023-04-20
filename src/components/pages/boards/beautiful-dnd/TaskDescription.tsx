import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useTranslate } from 'components/languageContext/languageContext';
import styles from './Task.module.scss';
import { TaskDataResponse } from 'services/taskServiceTypes';
import { useAppSelector } from 'store/store';
type TaskProps = {
  task: TaskDataResponse;
  asigneeId: string | undefined;
  setTaskDescription: (e: boolean) => void;
};

export const TaskDescription = ({ task, asigneeId, setTaskDescription }: TaskProps) => {
  const users = useAppSelector((state) => state.user.allUsersList);
  const user = users?.find((user) => user._id === asigneeId);
  const userName = useTranslate('form.name');
  const login = useTranslate('form.login');
  const title = useTranslate('form.taskTitle');
  const description = useTranslate('form.boardDescriptoon');
  const close = useTranslate('buttons.close');
  const closeTaskDescription = () => {
    setTaskDescription(false);
  };
  return (
    <Box className={styles.taskDescWrapper}>
      <Box className={styles.taskDescContent}>
        <Box>
          <Typography component="p" sx={{ textAlign: 'left' }}>
            {title}
          </Typography>
          <Typography component="p" sx={{ textAlign: 'left' }}>
            {description}
          </Typography>
          <Typography component="p" sx={{ textAlign: 'left' }}>
            {userName}
          </Typography>
          <Typography component="p" sx={{ textAlign: 'left' }}>
            {login}
          </Typography>
        </Box>
        <Box>
          <Typography component="p" sx={{ textAlign: 'left' }}>
            {task.title}
          </Typography>
          <Typography component="p" sx={{ textAlign: 'left' }}>
            {task.description}
          </Typography>
          <Typography component="p" sx={{ textAlign: 'left' }}>
            {user?.name}
          </Typography>
          <Typography component="p" sx={{ textAlign: 'left' }}>
            {user?.login}
          </Typography>
        </Box>
      </Box>
      <Button
        className={styles.formButton}
        onClick={closeTaskDescription}
        variant={'outlined'}
        color="error"
      >
        {close}
      </Button>
    </Box>
  );
};
