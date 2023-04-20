import React, { useEffect, useState } from 'react';
import styles from './Task.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import { TaskDataResponse } from 'services/taskServiceTypes';
import { BsTrash } from 'react-icons/bs';
import { TfiPencil } from 'react-icons/tfi';
import ListAllUserFromTask from '../ListAllUserFromTask';
import { useAppDispatch, useAppSelector } from 'store/store';
import { Typography } from '@mui/material';
import { updateTaskThunk } from 'store/thunks/taskThunk';
import { useParams } from 'react-router-dom';
import { User } from 'services/userServiceTypes';
import { getUserById } from 'services/userService';
import { ConfirmTaskRemoval } from '../boardForms/ConfirmTaskRemoval';
import { EditTaskName } from '../boardForms/EditTaskName';
import { TaskDescription } from './TaskDescription';
import { addConfirmDeleteTaskFormThunk, addConfirmEditTaskFormThunk } from 'store/thunks/formThunk';

type TaskProps = {
  task: TaskDataResponse;
  index: number;
  taskId: string;
  columnId: string;
  asigneeId?: string;
};
export default function Task({ task, index, taskId, columnId, asigneeId }: TaskProps) {
  const dispatch = useAppDispatch();
  const { boardId } = useParams() as { boardId: string };
  const [taskDescription, setTaskDescription] = useState(false);
  const [selectedAsigneeId, setSelectedAsigneeId] = useState('');
  const [asignee, setAsignee] = useState<User | null>(null);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [isEditModalOpened, setIsEditModalOpened] = useState(false);
  const confirmDeleteTask = useAppSelector((state) => state.form.confirmDeleteTask);
  const confirmEditTask = useAppSelector((state) => state.form.confirmEditTask);

  const taskData = {
    title: task.title,
    order: task.order,
    description: task.description,
    userId: selectedAsigneeId,
    boardId: boardId,
    columnId: columnId,
  };

  useEffect(() => {
    if (boardId && columnId && selectedAsigneeId)
      dispatch(updateTaskThunk(boardId, columnId, taskId, taskData));
  }, [selectedAsigneeId]);

  useEffect(() => {
    if (asigneeId) {
      getUserById(asigneeId).then(setAsignee);
    }
  }, [asigneeId]);

  const handleEdit = () => {
    setIsEditModalOpened(true);
    dispatch(addConfirmEditTaskFormThunk());
  };

  const hendleDeleteModalOpen = () => {
    setIsDeleteModalOpened(true);
    dispatch(addConfirmDeleteTaskFormThunk());
  };
  const hendleTaskDescription = (e: React.MouseEvent) => {
    // e.preventDefault();
    setTaskDescription(true);
  };
  return (
    <>
      <Draggable draggableId={taskId} index={index}>
        {(provided, snapshot) => (
          <div
            className={!snapshot.isDragging ? styles.wrapper : styles.draggingOver}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className={styles.content_wrapper}>
              <span onClick={hendleTaskDescription}>{task.title}</span>
              <div className={styles.button_wrapper}>
                <button className={styles.taskButton} onClick={handleEdit}>
                  {<TfiPencil />}
                </button>
                <button className={styles.taskButton} onClick={hendleDeleteModalOpen}>
                  {<BsTrash />}
                </button>
                <ListAllUserFromTask setSelectedAsigneeId={setSelectedAsigneeId} />
              </div>
            </div>

            {isDeleteModalOpened && confirmDeleteTask ? (
              <ConfirmTaskRemoval
                boardId={boardId}
                columnId={columnId}
                deleteCardId={taskId}
                setIsDeleteModalOpened={setIsDeleteModalOpened}
              />
            ) : null}
            {taskDescription ? (
              <TaskDescription
                setTaskDescription={setTaskDescription}
                task={task}
                asigneeId={asigneeId}
              />
            ) : null}
            <div>
              <Typography>{asignee?.name}</Typography>
            </div>
            {isEditModalOpened && confirmEditTask ? (
              <EditTaskName
                setIsEditModalOpened={setIsEditModalOpened}
                boardId={boardId}
                columnId={columnId}
                taskId={taskId}
                taskData={taskData}
                asigneeId={asigneeId}
              />
            ) : null}
          </div>
        )}
      </Draggable>
    </>
  );
}
