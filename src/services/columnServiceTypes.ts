import { TaskDataResponse } from './taskServiceTypes';

export type ColumnMainResponse = {
  id: string;
  title: string;
  order: number;
};

export type ColumnDataResponse = ColumnMainResponse & { tasks: TaskDataResponse[] };

export type CreateColumnData = {
  title: string;
};
