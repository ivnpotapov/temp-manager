import { taskSlice } from '../slices/taskSlice';
import { AppDispatch } from '../store';
import * as taskService from '../../services/taskService';
import { CreateTaskData, UpdateTaskData } from '../../services/taskServiceTypes';
import { boardSlice } from 'store/slices/boardSlice';

export const getAllUTasksList =
  (boardId: string, columnId: string) => async (dispatch: AppDispatch) => {
    dispatch(taskSlice.actions.setIsAllTasksFetching(true));
    const result = await taskService.getAllUTasks(boardId, columnId);
    dispatch(taskSlice.actions.setIsAllTasksFetching(false));
    dispatch(taskSlice.actions.setAllTasksList(result));
  };

export const createNewTaskThunk =
  (boardId: string, columnId: string, taskData: CreateTaskData) =>
  async (dispatch: AppDispatch) => {
    dispatch(taskSlice.actions.setIsTaskMainFetching(true));
    const result = await taskService.createNewTask(boardId, columnId, taskData);
    dispatch(taskSlice.actions.setIsTaskMainFetching(false));
    dispatch(boardSlice.actions.addNewTask(result));
    // return dispatch(getTaskByIdThunk(boardId, columnId, result.id));
  };

export const getTaskByIdThunk =
  (boardId: string, columnId: string, taskId: string) => async (dispatch: AppDispatch) => {
    dispatch(taskSlice.actions.setIsTaskDataFetching(true));
    const result = await taskService.getTaskById(boardId, columnId, taskId);
    dispatch(taskSlice.actions.setIsTaskDataFetching(false));
    dispatch(taskSlice.actions.setTaskData(result));
  };

export const deleteTaskByIdThunk =
  (boardId: string, columnId: string, taskId: string) => async (dispatch: AppDispatch) => {
    dispatch(taskSlice.actions.setIsTaskMainFetching(true));
    await taskService.deleteTaskById(boardId, columnId, taskId);
    dispatch(taskSlice.actions.setIsTaskMainFetching(false));
  };

export const updateTaskThunk =
  (boardId: string, columnId: string, taskId: string, taskData: UpdateTaskData) =>
  async (dispatch: AppDispatch) => {
    dispatch(taskSlice.actions.setIsTaskMainFetching(true));
    const result = await taskService.updateTask(boardId, columnId, taskId, taskData);
    dispatch(taskSlice.actions.setIsTaskMainFetching(false));
    dispatch(
      boardSlice.actions.updateTask({
        columnId: result.columnId,
        taskId: result.id,
        newData: taskData,
      })
    );
  };
