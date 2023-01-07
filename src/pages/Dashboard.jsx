import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainLayout from 'layout/MainLayout';
import axiosInstance from 'utils/axios';
import { getAllTodos } from 'store/features/todosSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  const init = useCallback(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  useEffect(() => {
    init();
  }, [init]);
  console.log(todos);

  const signUp = async () => {
    const res = await axiosInstance.post('/signup', {
      name: 'Galih',
      email: 'pangestu@galih.com',
      password: 'password',
      password_confirmation: 'password',
    });

    console.log(res);
  };

  return (
    <MainLayout>
      {/* <button onClick={signUp}>SIGN UP</button> */}
      <div className="flex gap-2 p-[24px]">
        {todos &&
          todos.map((todo) => (
            <div className="max-w-sm w-full flex flex-col items-start p-[20px] gap-[8px] border-2 bg-primary/10 rounded-[4px] border-primary">
              <h1>{todo.title}</h1>
              <h2>January - March</h2>
              <div class="flex flex-col w-full h-[40] bg-white p-[10px]">
                <h3 class="font-bold text-[14px]">Redesign UI</h3>
                <div class="flex justify-between items-center">
                  <div className="flex items-center gap-2 w-3/4">
                    <div class="bg-red-400 w-[100%] h-[15px] rounded-[8px]"></div>
                    <div>20%</div>
                  </div>
                  ...
                </div>
              </div>
              <button>+ Task</button>
            </div>
          ))}

        {/* {todos && todos.lenght === 0 && <div>No Data</div>} */}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
