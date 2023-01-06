import { configureStore } from '@reduxjs/toolkit';
import counterReducer from 'store/features/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
