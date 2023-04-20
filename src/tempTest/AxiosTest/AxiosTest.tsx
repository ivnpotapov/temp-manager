import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  getAllUsersList,
  getCurrentUserByIdThunk,
  deleteUserByIdThunk,
  updateUserThunk,
  createNewUserThunk,
  signinThunk,
} from '../../store/thunks/userThunk';

const userData = { name: 'qwe', login: 'qwe', password: '123456' };
const userData2 = { name: 'QWERTY', login: 'qwe', password: '123456' };
// {"id":"f05e7036-3282-4ad9-b92e-dfb9b90a73a0","name":"qwe","login":"qwe"}
const userLoginData = { login: 'qwe', password: '123456' };

const user2Data = { name: 'asd', login: 'asd', password: '123456' };

export const AxiosTest = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const isUserFetching = useAppSelector((state) => state.user.isUserFetching);
  const isAllUsersFetching = useAppSelector((state) => state.user.isAllUsersFetching);
  const allUsersList = useAppSelector((state) => state.user.allUsersList);

  useEffect(() => {
    dispatch(getAllUsersList());
  }, []);

  return (
    <>
      <div>user: {JSON.stringify(user)}</div>
      <div>isUserFetching: {JSON.stringify(isUserFetching)}</div>
      <div>isAllUsersFetching: {JSON.stringify(isAllUsersFetching)}</div>
      <div>isAllUsersFetching: {JSON.stringify(allUsersList)}</div>
    </>
  );
};
