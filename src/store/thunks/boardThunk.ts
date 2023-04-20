import { boardSlice } from '../../store/slices/boardSlice';
import { AppDispatch } from '../../store/store';
import * as boardService from '../../services/boardService';
import { BoardDataResponse, CreateBoardData } from '../../services/boardServiceTypes';

export const getAllUBoardsList = () => async (dispatch: AppDispatch) => {
  dispatch(boardSlice.actions.setIsAllBoardsFetching(true));
  const result = await boardService.getAllUBoards();
  dispatch(boardSlice.actions.setIsAllBoardsFetching(false));
  dispatch(boardSlice.actions.setAllBoardsList(result));
};

export const createNewBoardThunk =
  (boardData: CreateBoardData) => async (dispatch: AppDispatch) => {
    dispatch(boardSlice.actions.setIsBoardMainFetching(true));
    const result = await boardService.createNewBoard(boardData);
    dispatch(boardSlice.actions.setIsBoardMainFetching(false));
    dispatch(boardSlice.actions.setBoardMain(result));
  };

export const getBoardByIdThunk = (boardId: string) => async (dispatch: AppDispatch) => {
  dispatch(boardSlice.actions.setIsBoardDataFetching(true));
  const result = await boardService.getBoardById(boardId);
  dispatch(boardSlice.actions.setIsBoardDataFetching(false));
  dispatch(boardSlice.actions.setBoardData(result));
};

export const deleteBoardByIdThunk = (boardId: string) => async (dispatch: AppDispatch) => {
  dispatch(boardSlice.actions.setIsBoardMainFetching(true));
  await boardService.deleteBoardById(boardId);
  dispatch(boardSlice.actions.setIsBoardMainFetching(false));
};

export const updateBoardThunk =
  (boardId: string, boardData: CreateBoardData) => async (dispatch: AppDispatch) => {
    dispatch(boardSlice.actions.setIsBoardMainFetching(true));
    const result = await boardService.updateBoard(boardId, boardData);
    dispatch(boardSlice.actions.setIsBoardMainFetching(false));
    dispatch(boardSlice.actions.setBoardMain(result));
  };
export const updateBoard = (boardData: BoardDataResponse) => async (dispatch: AppDispatch) => {
  dispatch(boardSlice.actions.setIsBoardMainFetching(true));
  dispatch(boardSlice.actions.setIsBoardMainFetching(false));
  dispatch(boardSlice.actions.setBoardData(boardData));
};
