import axios from 'axios';
import { EApiParametrs, getTokenLocalStorage, EApiRoutes } from './apiConstants';

const instanceUserAxios = axios.create({
  baseURL: `${EApiParametrs.baseUrl}/${EApiRoutes.file}`,
  headers: { Accept: 'multipart/form-data', 'Content-Type': 'multipart/form-data' },
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

export const uploadFile = async (fileData: string): Promise<void> => {
  await instanceUserAxios.post('', fileData);
};

export const downloadData = async (taskId: string, faleName: string): Promise<void> => {
  await instanceUserAxios.get(`/${taskId}/${faleName}`);
};
