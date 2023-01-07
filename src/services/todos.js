import axiosInstance from 'utils/axios';

const getTodos = async () => {
  const res = await axiosInstance.get('/todos', {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMzEsImV4cCI6MTY4MTY1ODg1MX0.y3mnx_7QoXdLOFRAmAbYaFjbC155Q05cUNV233tlWR0`,
    },
  });

  return res;
};

const createTodo = async (data) => {
  const res = await axiosInstance.post('/todos', data, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMzEsImV4cCI6MTY4MTY1ODg1MX0.y3mnx_7QoXdLOFRAmAbYaFjbC155Q05cUNV233tlWR0`,
    },
  });
  console.log(res);
  return res;
};

const updateTodo = async (id, data) => {
  const res = await axiosInstance.put(`/todos/${id}`, data);

  return res;
};

const deleteTodo = async (id) => {
  const res = await axiosInstance.delete(`/todos/${id}`);

  return res;
};

export { getTodos, createTodo, updateTodo, deleteTodo };
