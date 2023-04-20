import { FileDataResponse } from './fileServiceTypes';

export type TaskDataResponse = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId?: string;
  boardId: string;
  columnId: string;
  files?: FileDataResponse[];
};

export type CreateTaskData = {
  title: string;
  description: string;
  userId: string;
};

export type CreateTaskResponse = CreateTaskData & { id: string };

export type UpdateTaskData = {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
};

export type UpdateTaskResponse = UpdateTaskData & { id: string };
