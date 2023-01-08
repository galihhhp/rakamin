import axiosInstance from 'utils/axios';
import getLocalStorage from 'utils/getLocalStorage';

const getTodos = async () => {
  const res = await axiosInstance.get('/todos', {
    headers: {
      Authorization: `Bearer ${getLocalStorage('token')}`,
    },
  });
  console.log(res);
  return res;
};

const createTodo = async (data) => {
  const res = await axiosInstance.post('/todos', data, {
    headers: {
      Authorization: `Bearer ${getLocalStorage('token')}`,
    },
  });

  return res;
};

export { getTodos, createTodo };
