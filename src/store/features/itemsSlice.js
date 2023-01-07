import { createItem, getItems } from 'services/items';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const getAllItems = createAsyncThunk('items/get', async (todoId) => {
  const response = await getItems(todoId);

  return response.data;
});

export const createNewItem = createAsyncThunk(
  'items/create',

  async (data) => {
    console.log('THUNK', data);
    const response = await createItem(
      {
        name: data.name,
        progress_percentage: data.progress,
      },
      data.todoId
    );

    return response.data;
  }
);

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  extraReducers: {
    [getAllItems.fulfilled]: (state, action) => {
      const sorted = action.payload.sort((a, b) => {
        return new Date(b.updated_at) - new Date(a.updated_at);
      });

      // grouping by todo_id
      const grouped = sorted.reduce((r, a) => {
        r[a.todo_id] = [...(r[a.todo_id] || []), a];
        return r;
      });
      console.log(sorted);

      state.items.unshift(...sorted);

      // delete duplice
    },
    [createNewItem.fulfilled]: (state, action) => {
      // state.items[action.payload.todo_id].unshift(action.payload);

      state.items.unshift(action.payload);
    },
    [getAllItems.rejected]: (state, action) => {
      // console.log(action);
    },
    [createNewItem.rejected]: (state, action) => {
      // console.log(action);
    },
    [getAllItems.pending]: (state, action) => {
      // console.log(action);
    },
    [createNewItem.pending]: (state, action) => {
      // console.log(action);
    },
  },
});

export const { reducer } = itemsSlice.actions;

export default itemsSlice.reducer;
