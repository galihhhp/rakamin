import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from 'store/features/itemsSlice';
import todosReducer from 'store/features/todosSlice';

const reducer = {
  todos: todosReducer,
  items: itemsReducer,
};

export const store = configureStore({
  reducer: reducer,
});
