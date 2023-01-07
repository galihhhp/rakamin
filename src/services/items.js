import axiosInstance from 'utils/axios';

const getItems = async () => {
  const res = await axiosInstance.get('/todos');

  return res;
};

const createItem = async (data) => {
  const res = await axiosInstance.post('/todos', data);

  return res;
};

const updateItem = async (id, data) => {
  const res = await axiosInstance.put(`/todos/${id}`, data);

  return res;
};

const deleteItem = async (id) => {
  const res = await axiosInstance.delete(`/todos/${id}`);

  return res;
};

export { getItems, createItem, updateItem, deleteItem };
