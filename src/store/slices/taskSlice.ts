import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskDataResponse, UpdateTaskResponse } from '../../services/taskServiceTypes';

type TaskInitialState = {
  taskMain?: UpdateTaskResponse;
  isTaskMainFetching: boolean;
  taskData?: TaskDataResponse;
  isTaskDataFetching: boolean;
  allTasksList?: TaskDataResponse[];
  isAllTasksFetching: boolean;
};

const initialState: TaskInitialState = {
  taskMain: undefined,
  isTaskMainFetching: false,
  taskData: undefined,
  isTaskDataFetching: false,
  allTasksList: undefined,
  isAllTasksFetching: false,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTaskMain: (state, action: PayloadAction<UpdateTaskResponse>) => {
      state.taskMain = action.payload;
    },
    setIsTaskMainFetching: (state, action: PayloadAction<boolean>) => {
      state.isTaskMainFetching = action.payload;
    },
    setTaskData: (state, action: PayloadAction<TaskDataResponse>) => {
      state.taskData = action.payload;
    },
    setIsTaskDataFetching: (state, action: PayloadAction<boolean>) => {
      state.isTaskDataFetching = action.payload;
    },
    setAllTasksList: (state, action: PayloadAction<TaskDataResponse[]>) => {
      state.allTasksList = action.payload;
    },
    setIsAllTasksFetching: (state, action: PayloadAction<boolean>) => {
      state.isAllTasksFetching = action.payload;
    },
  },
});
