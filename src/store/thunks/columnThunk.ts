import { columnSlice } from '../../store/slices/columnSlice';
import { AppDispatch } from '../../store/store';
import * as columnService from '../../services/columnService';
import { CreateColumnData } from '../../services/columnServiceTypes';

export const getAllUColumnsListThunk = (boardId: string) => async (dispatch: AppDispatch) => {
  dispatch(columnSlice.actions.setIsAllColumnsFetching(true));
  const result = await columnService.getAllUColumns(boardId);
  dispatch(columnSlice.actions.setIsAllColumnsFetching(false));
  dispatch(columnSlice.actions.setAllColumnsList(result));
};

export const createNewColumnThunk =
  (boardId: string, columnData: CreateColumnData) => async (dispatch: AppDispatch) => {
    dispatch(columnSlice.actions.setIsColumnMainFetching(true));
    const result = await columnService.createNewColumn(boardId, columnData);
    dispatch(columnSlice.actions.setIsColumnMainFetching(false));
    dispatch(columnSlice.actions.setColumnMain(result));
  };

export const getColumnByIdThunk =
  (boardId: string, columnId: string) => async (dispatch: AppDispatch) => {
    dispatch(columnSlice.actions.setIsColumnDataFetching(true));
    const result = await columnService.getColumnById(boardId, columnId);
    dispatch(columnSlice.actions.setIsColumnDataFetching(false));
    dispatch(columnSlice.actions.setColumnData(result));
  };

export const deleteColumnByIdThunk =
  (boardId: string, columnId: string) => async (dispatch: AppDispatch) => {
    dispatch(columnSlice.actions.setIsColumnMainFetching(true));
    await columnService.deleteColumnById(boardId, columnId);
    dispatch(columnSlice.actions.setIsColumnMainFetching(false));
  };

export const updateColumnThunk =
  (boardId: string, columnId: string, columnData: CreateColumnData & { order: number }) =>
  async (dispatch: AppDispatch) => {
    dispatch(columnSlice.actions.setIsColumnMainFetching(true));
    const result = await columnService.updateColumn(boardId, columnId, columnData);
    dispatch(columnSlice.actions.setIsColumnMainFetching(false));
    dispatch(columnSlice.actions.setColumnMain(result));
  };
