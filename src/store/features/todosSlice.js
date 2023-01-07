import { createTodo, deleteTodo, getTodos, updateTodo } from 'services/todos';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};

export const getAllTodos = createAsyncThunk('todos/get', async () => {
  const response = await getTodos();

  return response.data;
});

export const createNewTodo = createAsyncThunk(
  'todos/create',

  async (data) => {
    const response = await createTodo({
      title: data.title,
      description: data.description,
    });

    return response.data;
  }
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  extraReducers: {
    [getAllTodos.fulfilled]: (state, action) => {
      state.todos = action.payload;
    },
    [createNewTodo.fulfilled]: (state, action) => {
      state.todos.push(action.payload);
    },
    [getAllTodos.rejected]: (state, action) => {
      // console.log(action);
    },
    [createNewTodo.rejected]: (state, action) => {
      // console.log(action);
    },
    [getAllTodos.pending]: (state, action) => {
      // console.log(action);
    },
    [createNewTodo.pending]: (state, action) => {
      // console.log(action);
    },
  },
});

export const { reducer } = todosSlice.actions;

export default todosSlice.reducer;
