import { useCallback, useEffect } from 'react';

import MainLayout from 'layout/MainLayout';
import Todos from 'components/cards/Todos';
import axiosInstance from 'utils/axios';
import { useTodos } from 'store/TodosProvider';

const Dashboard = () => {
  // const dispatch = useDispatch();
  // const todos = useSelector((state) => state.todos.todos);
  // const items = useSelector((state) => state.items.items);

  const init = useCallback(() => {
    // dispatch(getAllTodos());
    // dispatch(getAllItems())
  }, []);

  useEffect(() => {
    // init();
  }, [init]);
  // console.log(todos);

  const signUp = async () => {
    const res = await axiosInstance.delete(`/todos/196/items/641`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMzEsImV4cCI6MTY4MTY1ODg1MX0.y3mnx_7QoXdLOFRAmAbYaFjbC155Q05cUNV233tlWR0`,
      },
    });

    console.log(res);
  };

  const { todos } = useTodos();

  return (
    <MainLayout>
      <button onClick={signUp}>SIGN UP</button>
      <div className="flex gap-2 p-[24px]">
        {todos && todos.map((todo) => <Todos todo={todo} />)}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
