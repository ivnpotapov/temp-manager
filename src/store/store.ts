import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import { userSlice } from './slices/userSlice';
import { boardSlice } from './slices/boardSlice';
import { columnSlice } from './slices/columnSlice';
import { formSlice } from './slices/formSlice';
import { taskSlice } from './slices/taskSlice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  board: boardSlice.reducer,
  column: columnSlice.reducer,
  form: formSlice.reducer,
  task: taskSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
