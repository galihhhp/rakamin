import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './features/todosSlice';

const reducer = {
  todos: todosReducer,
};

export const store = configureStore({
  reducer: reducer,
});
