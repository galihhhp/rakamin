import axiosInstance from 'utils/axios';

const getItems = async (todoId) => {
  const res = await axiosInstance.get(`/todos/${todoId}/items`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMzEsImV4cCI6MTY4MTY1ODg1MX0.y3mnx_7QoXdLOFRAmAbYaFjbC155Q05cUNV233tlWR0`,
    },
  });
  // console.log('SERVICES', res.data);
  return res;
};

const createItem = async (data, todoId) => {
  console.log('SERVICES', data, todoId);
  const res = await axiosInstance.post(`/todos/${todoId}/items`, data, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMzEsImV4cCI6MTY4MTY1ODg1MX0.y3mnx_7QoXdLOFRAmAbYaFjbC155Q05cUNV233tlWR0`,
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMzEsImV4cCI6MTY4MTY1ODg1MX0.y3mnx_7QoXdLOFRAmAbYaFjbC155Q05cUNV233tlWR0`,
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMzEsImV4cCI6MTY4MTY1ODg1MX0.y3mnx_7QoXdLOFRAmAbYaFjbC155Q05cUNV233tlWR0`,
      },
    }
  );

  console.log('SERVICES', target);

  return res;
};

const deleteItem = async (todoId, itemId) => {
  const res = await axiosInstance.delete(`/todos/${todoId}/items/${itemId}`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMzEsImV4cCI6MTY4MTY1ODg1MX0.y3mnx_7QoXdLOFRAmAbYaFjbC155Q05cUNV233tlWR0`,
    },
  });
  return res;
};

export { getItems, createItem, updateItem, deleteItem };
