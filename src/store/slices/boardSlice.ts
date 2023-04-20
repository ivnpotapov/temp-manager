import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { CreateNewTaskResponse } from 'services/taskService';
import { TaskDataResponse } from 'services/taskServiceTypes';
import { BoardMainResponse, BoardDataResponse } from '../../services/boardServiceTypes';

type BoardInitialState = {
  boardMain?: BoardMainResponse;
  isBoardMainFetching: boolean;
  boardData?: BoardDataResponse;
  isBoardDataFetching: boolean;
  allBoardsList?: BoardMainResponse[];
  isAllBoardsFetching: boolean;
};

const initialState: BoardInitialState = {
  boardMain: undefined,
  isBoardMainFetching: false,
  boardData: undefined,
  isBoardDataFetching: false,
  allBoardsList: undefined,
  isAllBoardsFetching: false,
};

type UpdateTaskParams = {
  columnId: string;
  taskId: string;
  newData: Partial<TaskDataResponse>;
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoardMain: (state, action: PayloadAction<BoardMainResponse>) => {
      state.boardMain = action.payload;
    },
    setIsBoardMainFetching: (state, action: PayloadAction<boolean>) => {
      state.isBoardMainFetching = action.payload;
    },
    setBoardData: (state, action: PayloadAction<BoardDataResponse | undefined>) => {
      state.boardData = action.payload;
    },
    updateTask: (state, action: PayloadAction<UpdateTaskParams>) => {
      const columnForEdit = state.boardData?.columns.find(
        (column) => column.id === action.payload.columnId
      );
      if (columnForEdit) {
        const taskForEdit = columnForEdit.tasks.find((task) => task.id === action.payload.taskId);
        if (taskForEdit) {
          columnForEdit.tasks = columnForEdit.tasks
            .filter((task) => task.id !== taskForEdit.id)
            .concat({ ...taskForEdit, ...action.payload.newData });
        }
      }
    },
    addNewTask: (state, action: PayloadAction<CreateNewTaskResponse>) => {
      const columnForEdit = state.boardData?.columns.find(
        (column) => column.id === action.payload.columnId
      );
      if (columnForEdit) columnForEdit.tasks = columnForEdit.tasks.concat(action.payload);
    },
    setIsBoardDataFetching: (state, action: PayloadAction<boolean>) => {
      state.isBoardDataFetching = action.payload;
    },
    setAllBoardsList: (state, action: PayloadAction<BoardMainResponse[]>) => {
      state.allBoardsList = action.payload;
    },
    setIsAllBoardsFetching: (state, action: PayloadAction<boolean>) => {
      state.isAllBoardsFetching = action.payload;
    },
    // setUpdateBoardData: (state, action: PayloadAction<BoardDataResponse>) => {
    //   state.boardData = action.payload;
    // },
  },
});
