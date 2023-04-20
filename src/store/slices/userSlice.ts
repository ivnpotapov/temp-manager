import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../services/userServiceTypes';

type UserInitialState = {
  user?: User;
  isUserFetching: boolean;
  allUsersList?: User[];
  isAllUsersFetching?: boolean;
};

const initialState: UserInitialState = {
  user: undefined,
  isUserFetching: true,
  isAllUsersFetching: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
    },

    setIsUserFetching: (state, action: PayloadAction<boolean>) => {
      state.isUserFetching = action.payload;
    },

    setAllUsersList: (state, action: PayloadAction<User[]>) => {
      state.allUsersList = action.payload;
    },

    setIsAllUsersFetching: (state, action: PayloadAction<boolean>) => {
      state.isAllUsersFetching = action.payload;
    },
  },
});
