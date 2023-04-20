import axios from 'axios';
import { EApiParametrs, getTokenLocalStorage, EApiRoutes } from './apiConstants';
import { BoardMainResponse, CreateBoardData, BoardDataResponse } from './boardServiceTypes';

const instanceBoardAxios = axios.create({
  baseURL: `${EApiParametrs.baseUrl}/${EApiRoutes.boards}`,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

instanceBoardAxios.interceptors.request.use(
  (config) => {
    const token = getTokenLocalStorage();
    if (config.headers && token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const getAllUBoards = async (): Promise<BoardMainResponse[]> => {
  const result = await instanceBoardAxios.get('');
  return result.data;
};

export const createNewBoard = async (boardData: CreateBoardData): Promise<BoardMainResponse> => {
  const result = await instanceBoardAxios.post('', boardData);
  return result.data;
};

export const getBoardById = async (boardId: string): Promise<BoardDataResponse> => {
  const result = await instanceBoardAxios.get(`/${boardId}`);
  return result.data;
};

export const deleteBoardById = async (boardId: string): Promise<void> => {
  await instanceBoardAxios.delete(`/${boardId}`);
};

export const updateBoard = async (
  boardId: string,
  boardData: CreateBoardData
): Promise<BoardMainResponse> => {
  const result = await instanceBoardAxios.put(`/${boardId}`, boardData);
  return result.data;
};
