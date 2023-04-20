export enum EApiParametrs {
  baseUrl = 'https://project-manager-backend-u2pl.onrender.com', // railway Mongo
  tokenLocalStorage = 'token',
}

export enum EApiRoutes {
  users = 'users',
  signin = 'auth/signin',
  signup = 'auth/signup',
  boards = 'boards',
  columns = 'columns',
  tasks = 'tasks',
  file = 'file',
}

export const getTokenLocalStorage = (): string => {
  const token = localStorage.getItem(EApiParametrs.tokenLocalStorage);

  return token ? `Bearer ${token}` : '';
};

export const setTokenLocalStorage = (token: string): void => {
  localStorage.setItem(EApiParametrs.tokenLocalStorage, token);
};
