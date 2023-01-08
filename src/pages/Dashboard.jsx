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

  const { todos } = useTodos();

  const cardColor = [
    'border-primary bg-bgprimary',
    'border-warning bg-bgwarning',
    'border-danger bg-[#FFFAFA]',
    'border-success bg-bgsuccess',
  ];

  const textColor = [
    'text-primary',
    'text-warning',
    'text-danger',
    'text-success',
  ];

  const periode = [
    'January - March',
    'April - June',
    'July - September',
    'October - December',
  ];

  const random = Math.floor(Math.random() * 4);

  // if (todos.length > cardColor.length) ulang dari index 0 lagi

  return (
    <MainLayout>
      <div className="flex gap-2 p-[24px]">
        {todos && todos.length > 0 ? (
          todos.map((todo, index) => (
            <Todos
              todo={todo}
              bgColor={
                todos.length > cardColor.length
                  ? cardColor[random]
                  : cardColor[index]
              }
              textColor={
                todos.length > textColor.length
                  ? textColor[random]
                  : textColor[index]
              }
              periode={
                todos.length > periode.length ? periode[random] : periode[index]
              }
            />
          ))
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <h1 className="text-textdark text-[24px] font-bold">
              No Todos Found
            </h1>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
