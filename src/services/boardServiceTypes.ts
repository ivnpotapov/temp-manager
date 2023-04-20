import { ColumnDataResponse } from './columnServiceTypes';

export type BoardMainResponse = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

export type BoardDataResponse = BoardMainResponse & { columns: ColumnDataResponse[] };

export type CreateBoardData = Omit<BoardMainResponse, '_id'>;
