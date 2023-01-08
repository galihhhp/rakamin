import axiosInstance from 'utils/axios';
import getLocalStorage from 'utils/getLocalStorage';

const getItems = async (todoId) => {
  const res = await axiosInstance.get(`/todos/${todoId}/items`, {
    headers: {
      Authorization: `Bearer ${getLocalStorage('token')}`,
    },
  });
  // console.log('SERVICES', res.data);
  return res;
};

const createItem = async (data, todoId) => {
  console.log('SERVICES', data, todoId);
  const res = await axiosInstance.post(`/todos/${todoId}/items`, data, {
    headers: {
      Authorization: `Bearer ${getLocalStorage('token')}`,
    },
  });

  return res;
};

const updateItem = async (todoId, itemId, data) => {
  const res = await axiosInstance.patch(
    `/todos/${todoId}/items/${itemId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${getLocalStorage('token')}`,
      },
    }
  );

  console.log('SERVICES', res);

  return res;
};

export const moveItem = async (todoId, itemId, target) => {
  const res = await axiosInstance.patch(
    `/todos/${todoId}/items/${itemId}`,
    target,
    {
      headers: {
        Authorization: `Bearer ${getLocalStorage('token')}`,
      },
    }
  );

  console.log('SERVICES', target);

  return res;
};

const deleteItem = async (todoId, itemId) => {
  const res = await axiosInstance.delete(`/todos/${todoId}/items/${itemId}`, {
    headers: {
      Authorization: `Bearer ${getLocalStorage('token')}`,
    },
  });
  return res;
};

export { getItems, createItem, updateItem, deleteItem };
