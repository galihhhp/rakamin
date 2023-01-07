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

export const updateTodoById = createAsyncThunk(
  'todos/update',

  async (data) => {
    const response = await updateTodo(data.id, {
      title: data.title,
      description: data.description,
    });

    return response.data;
  }
);

export const deleteTodoById = createAsyncThunk(
  'todos/delete',

  async (id) => {
    const response = await deleteTodo(id);

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
    [updateTodoById.fulfilled]: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[todoIndex] = action.payload;
    },
    [deleteTodoById.fulfilled]: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos.splice(todoIndex, 1);
    },
    [getAllTodos.rejected]: (state, action) => {
      console.log(action);
    },
    [createNewTodo.rejected]: (state, action) => {
      console.log(action);
    },
    [updateTodoById.rejected]: (state, action) => {
      console.log(action);
    },
    [deleteTodoById.rejected]: (state, action) => {
      console.log(action);
    },
    [getAllTodos.pending]: (state, action) => {
      console.log(action);
    },
    [createNewTodo.pending]: (state, action) => {
      console.log(action);
    },
    [updateTodoById.pending]: (state, action) => {
      console.log(action);
    },
    [deleteTodoById.pending]: (state, action) => {
      console.log(action);
    },
  },
});

export const { reducer } = todosSlice.actions;

export default todosSlice.reducer;
