import { userSlice } from '../../store/slices/userSlice';
import { AppDispatch } from '../../store/store';
import * as userService from '../../services/userService';
import { SignupUserData, LoginUserData, DecodedToken } from '../../services/userServiceTypes';
import { setTokenLocalStorage } from '../../services/apiConstants';
import jwt_decode from 'jwt-decode';

export const getAllUsersList = () => async (dispatch: AppDispatch) => {
  dispatch(userSlice.actions.setIsAllUsersFetching(true));
  const users = await userService.getAllUsers();
  dispatch(userSlice.actions.setIsAllUsersFetching(false));
  dispatch(userSlice.actions.setAllUsersList(users));
};

export const getCurrentUserByIdThunk = (userId: string) => async (dispatch: AppDispatch) => {
  console.log('userId', userId);
  dispatch(userSlice.actions.setIsUserFetching(true));
  const user = await userService.getUserById(userId);
  dispatch(userSlice.actions.setIsUserFetching(false));
  return dispatch(userSlice.actions.setUser(user));
};

export const deleteUserByIdThunk = (userId: string) => async (dispatch: AppDispatch) => {
  dispatch(userSlice.actions.setIsUserFetching(true));
  await userService.deleteUserById(userId);
  dispatch(userSlice.actions.setIsUserFetching(false));
  dispatch(userSlice.actions.setUser(undefined));
};

export const updateUserThunk =
  (userId: string, userData: SignupUserData) => async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.setIsUserFetching(true));
    const user = await userService.updateUser(userId, userData);
    dispatch(userSlice.actions.setIsUserFetching(false));
    dispatch(userSlice.actions.setUser(user));
  };

export const createNewUserThunk = (userData: SignupUserData) => async (dispatch: AppDispatch) => {
  const userLogin = { login: userData.name, password: userData.password };
  dispatch(userSlice.actions.setIsUserFetching(true));
  const user = await userService.createNewUser(userData);
  dispatch(userSlice.actions.setIsUserFetching(false));
  dispatch(userSlice.actions.setUser(user));

  const res = await userService.signin(userLogin);
  if (res.token) {
    setTokenLocalStorage(res.token);
    const decodedToken = jwt_decode<DecodedToken>(res.token);
    return dispatch(getCurrentUserByIdThunk(decodedToken.id));
  }
};

export const signinThunk = (userData: LoginUserData) => async (dispatch: AppDispatch) => {
  dispatch(userSlice.actions.setIsUserFetching(true));
  const res = await userService.signin(userData);
  if (res.token) {
    setTokenLocalStorage(res.token);
    const decodedToken = jwt_decode<DecodedToken>(res.token);
    return dispatch(getCurrentUserByIdThunk(decodedToken.id));
  }
};
