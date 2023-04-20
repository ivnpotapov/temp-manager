import axios from 'axios';
import { EApiParametrs, getTokenLocalStorage, EApiRoutes } from './apiConstants';
import { User, SignupUserData, LoginUserData, TokenResponse } from './userServiceTypes';

const instanceUserAxios = axios.create({
  baseURL: EApiParametrs.baseUrl,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

instanceUserAxios.interceptors.request.use(
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

export const getAllUsers = async (): Promise<User[]> => {
  const result = await instanceUserAxios.get(EApiRoutes.users);
  return result.data;
};

export const getUserById = async (userId: string): Promise<User> => {
  const result = await instanceUserAxios.get(`${EApiRoutes.users}/${userId}`);

  return result.data;
};

export const deleteUserById = async (userId: string): Promise<void> => {
  await instanceUserAxios.delete(`/${EApiRoutes.users}/${userId}`);
};

export const updateUser = async (userId: string, userData: SignupUserData): Promise<User> => {
  const result = await instanceUserAxios.put(`${EApiRoutes.users}/${userId}`, userData);
  return result.data;
};

export const createNewUser = async (userData: SignupUserData): Promise<User> => {
  const result = await instanceUserAxios.post(EApiRoutes.signup, userData);
  return result.data;
};

export const signin = async (userData: LoginUserData): Promise<TokenResponse> => {
  const result = await instanceUserAxios.post(EApiRoutes.signin, userData);

  return result.data;
};
