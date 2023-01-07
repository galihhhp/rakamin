import {
  createItem,
  deleteItem,
  getItems,
  moveItem,
  updateItem,
} from 'services/items';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainLayout from 'layout/MainLayout';
import TaskModal from 'components/modals/TaskModal';
import axiosInstance from 'utils/axios';
import { getAllItems } from 'store/features/itemsSlice';
import { getAllTodos } from 'store/features/todosSlice';
import { useTodos } from 'store/TodosProvider';

const Todos = ({ todo }) => {
  const { todos } = useTodos();
  // console.log(todos.findIndex((item) => item.id === todo.id));
  const [data, setData] = useState([]);

  const handleCreate = async (input) => {
    const res = await createItem(input, todo.id);
    // data.unshift(res.data);

    setData((prev) => [res.data, ...prev]);
  };

  const handleUpdate = async (input, itemId) => {
    const res = await updateItem(todo.id, itemId, input);
    console.log(res);

    const index = data.findIndex((item) => item.id === itemId);

    const newData = [...data];

    const updatedItem = {
      ...newData[index],
      ...input,
    };

    newData[index] = updatedItem;
    console.log(updatedItem);
    setData(newData);
  };

  const init = useCallback(async () => {
    const res = await getItems(todo.id);

    res.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    setData(res.data);
  }, [todo.id]);

  useEffect(() => {
    init();
  }, [init]);

  const handleMove = useCallback(
    async (itemId, item, idx) => {
      await moveItem(todo.id, itemId, {
        target_todo_id: todos[idx].id,
      });

      setData((prev) => prev.filter((item) => item.id !== itemId));
    },
    [todo.id, todos]
  );
  // console.log(data);
  return (
    <div
      key={todo.id}
      className="max-w-md w-full flex flex-col h-min items-start p-[20px] gap-[8px] border-2 bg-primary/10 rounded-[4px] border-primary bg-bgprimary">
      <h1 className="border border-borderprimary py-[4px] px-[8px] rounded-[4px] text-primary min-w-[72px] text-center font-normal">
        {todo.title}
      </h1>
      <h2 className="text-textdark font-bold text-[12px]">January - March</h2>
      {data &&
        data.map((item) => {
          // console.log(item);
          if (item.todo_id !== todo.id) return null;

          return (
            <div className="flex flex-col w-full h-[120px] rounded-[4px] bg-bggrey border border-bordergrey p-[16px]">
              <h3 className="font-bold text-[14px] h-full text-textdark">
                {item.name}
              </h3>
              <div className="flex justify-between items-center border-t border-borderdash border-dashed pt-3">
                <div className="flex items-center gap-2 w-3/4">
                  <div className="bg-black h-[15px] w-full rounded-full flex items-center ">
                    <div
                      className={`${
                        item.progress_percentage === 100
                          ? 'bg-success'
                          : 'bg-red-100'
                      } h-[15px] rounded-l-full w-["${
                        item.progress_percentage
                      }"] w-10`}></div>
                  </div>
                  {item.progress_percentage === 100 ? (
                    <div className="rounded-full h-4 w-4 bg-success flex justify-center items-center">
                      <svg
                        width="8"
                        height="6"
                        viewBox="0 0 8 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1.6001 2.89098L3.2001 4.49098L6.29105 1.40002"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div>{item.progress_percentage ?? 0}%</div>
                  )}
                </div>
                {/* <button onClick={() => setMenu(!menu)}>...</button> */}
                <Menu
                  item={item}
                  key={todo.id}
                  onMoveRight={async () => {
                    const index = todos.findIndex(
                      (item) => item.id === todo.id
                    );

                    await handleMove(item.id, item, index + 1);
                  }}
                  onMoveLeft={async () => {
                    const index = todos.findIndex(
                      (item) => item.id === todo.id
                    );

                    await handleMove(item.id, item, index - 1);
                  }}
                  onEdit={(input) => {
                    handleUpdate(input, item.id);
                  }}
                />
              </div>
            </div>
          );
        })}

      <TaskModal
        isCreate
        todoId={todo.id}
        onAction={(input) => {
          handleCreate({
            name: input.name,
            progress_percentage: input.progress,
          });
        }}
      />
    </div>
  );
};

export default Todos;

const Menu = ({ item, onMoveRight, onMoveLeft, onEdit }) => {
  // if (!show) return null;
  const [menu, setMenu] = useState(false);
  return (
    <div className="relative inline-block text-left">
      <button onClick={() => setMenu(!menu)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
            stroke="#757575"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
            stroke="#757575"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
            stroke="#757575"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      {menu && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1">
          <div className="py-1 p-4 gap-2 flex flex-col" role="none">
            <button
              className="flex items-center gap-2 hover:text-primary font-semibold text-[14px] gap-[22px]"
              onClick={onMoveRight}>
              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.4538 6.80069L11.4537 6.80073L11.4575 6.80994C11.5075 6.93167 11.5075 7.06821 11.4575 7.18994L11.4574 7.1899L11.4538 7.19919C11.4306 7.25916 11.396 7.31406 11.3519 7.36091L6.35644 12.3564L6.355 12.3578C6.30852 12.4047 6.25321 12.4419 6.19229 12.4673C6.13136 12.4927 6.06601 12.5057 6 12.5057C5.93399 12.5057 5.86864 12.4927 5.80771 12.4673C5.74679 12.4419 5.69148 12.4047 5.645 12.3578L5.6421 12.3549C5.59524 12.3085 5.55804 12.2532 5.53266 12.1922C5.50727 12.1313 5.4942 12.0659 5.4942 11.9999C5.4942 11.9339 5.50727 11.8686 5.53266 11.8077C5.55804 11.7467 5.59524 11.6914 5.6421 11.6449L5.64302 11.644L8.94302 8.35403L9.7997 7.49994H8.59H1C0.867392 7.49994 0.740215 7.44726 0.646447 7.35349C0.552678 7.25973 0.5 7.13255 0.5 6.99994C0.5 6.86733 0.552678 6.74016 0.646447 6.64639C0.740215 6.55262 0.867392 6.49994 1 6.49994H8.59H9.7997L8.94302 5.64585L5.64355 2.35639C5.6435 2.35633 5.64345 2.35628 5.64339 2.35623C5.54896 2.26171 5.49591 2.13356 5.49591 1.99994C5.49591 1.93374 5.50895 1.86819 5.53428 1.80703C5.55961 1.74588 5.59674 1.6903 5.64355 1.64349C5.73809 1.54896 5.86631 1.49585 6 1.49585C6.0662 1.49585 6.13175 1.50889 6.19291 1.53422C6.25407 1.55955 6.30964 1.59669 6.35645 1.64349L6.70831 1.29163L6.35645 1.64349L11.3519 6.63897C11.396 6.68582 11.4306 6.74073 11.4538 6.80069Z"
                  fill="#333333"
                  stroke="#333333"
                />
              </svg>
              Move Right
            </button>
            <button
              className="flex items-center hover:text-primary font-semibold text-[14px] gap-[18px]"
              onClick={onMoveLeft}>
              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.05688 5.64585L2.20019 6.49994H3.4099H10.9999C11.1325 6.49994 11.2597 6.55262 11.3534 6.64639C11.4472 6.74016 11.4999 6.86733 11.4999 6.99994C11.4999 7.13255 11.4472 7.25973 11.3534 7.35349C11.2597 7.44726 11.1325 7.49994 10.9999 7.49994H3.4099H2.20019L3.05688 8.35403L6.35688 11.644L6.3578 11.6449C6.40466 11.6914 6.44186 11.7467 6.46724 11.8077C6.49263 11.8686 6.50569 11.9339 6.50569 11.9999C6.50569 12.0659 6.49263 12.1313 6.46724 12.1922C6.44186 12.2532 6.40466 12.3085 6.3578 12.3549L6.35778 12.3549L6.3549 12.3578C6.30841 12.4047 6.25311 12.4419 6.19218 12.4673C6.13126 12.4927 6.06591 12.5057 5.9999 12.5057C5.93389 12.5057 5.86854 12.4927 5.80761 12.4673C5.74668 12.4419 5.69138 12.4047 5.6449 12.3578L5.64345 12.3564L0.647971 7.36091C0.603933 7.31407 0.569333 7.25916 0.546081 7.19919L0.546173 7.19915L0.54239 7.18994C0.492381 7.06821 0.492381 6.93167 0.54239 6.80994L0.542481 6.80998L0.546081 6.80069C0.569333 6.74073 0.603933 6.68582 0.64797 6.63897L5.64345 1.64349L5.29173 1.29177L5.64345 1.64349C5.73799 1.54896 5.8662 1.49585 5.9999 1.49585C6.13359 1.49585 6.26181 1.54896 6.35634 1.64349C6.45088 1.73803 6.50399 1.86625 6.50399 1.99994C6.50399 2.13356 6.45094 2.26171 6.3565 2.35623C6.35645 2.35628 6.3564 2.35633 6.35634 2.35639L3.05688 5.64585Z"
                  fill="#333333"
                  stroke="#333333"
                />
              </svg>
              Move Left
            </button>
            <TaskModal
              item={item}
              onAction={(input) => {
                onEdit({
                  name: input.name,
                  progress_percentage: input.progress,
                });
              }}
            />
            <button className="flex items-center  hover:text-danger font-semibold text-[14px] gap-[18px]">
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.5 4V4.5H13H17C17.1326 4.5 17.2598 4.55268 17.3536 4.64645C17.4473 4.74021 17.5 4.86739 17.5 5C17.5 5.13261 17.4473 5.25979 17.3536 5.35355C17.2598 5.44732 17.1326 5.5 17 5.5H16H15.5V6V17C15.5 17.663 15.2366 18.2989 14.7678 18.7678C14.2989 19.2366 13.663 19.5 13 19.5H5C4.33696 19.5 3.70107 19.2366 3.23223 18.7678C2.76339 18.2989 2.5 17.663 2.5 17V6V5.5H2H1C0.867392 5.5 0.740215 5.44732 0.646446 5.35355C0.552678 5.25979 0.5 5.13261 0.5 5C0.5 4.86739 0.552678 4.74021 0.646446 4.64645C0.740215 4.55268 0.867392 4.5 1 4.5H5H5.5V4V3C5.5 2.33696 5.76339 1.70107 6.23223 1.23223C6.70107 0.763392 7.33696 0.5 8 0.5H10C10.663 0.5 11.2989 0.763392 11.7678 1.23223C12.2366 1.70107 12.5 2.33696 12.5 3V4ZM11 4.5H11.5V4V3C11.5 2.60217 11.342 2.22064 11.0607 1.93934C10.7794 1.65804 10.3978 1.5 10 1.5H8C7.60218 1.5 7.22064 1.65804 6.93934 1.93934C6.65804 2.22064 6.5 2.60217 6.5 3V4V4.5H7H11ZM4 5.5H3.5V6V17C3.5 17.3978 3.65804 17.7794 3.93934 18.0607C4.22064 18.342 4.60218 18.5 5 18.5H13C13.3978 18.5 13.7794 18.342 14.0607 18.0607C14.342 17.7794 14.5 17.3978 14.5 17V6V5.5H14H4ZM7.35355 15.3536C7.25979 15.4473 7.13261 15.5 7 15.5C6.86739 15.5 6.74021 15.4473 6.64645 15.3536C6.55268 15.2598 6.5 15.1326 6.5 15V9C6.5 8.86739 6.55268 8.74022 6.64645 8.64645C6.74022 8.55268 6.86739 8.5 7 8.5C7.13261 8.5 7.25978 8.55268 7.35355 8.64645C7.44732 8.74022 7.5 8.86739 7.5 9V15C7.5 15.1326 7.44732 15.2598 7.35355 15.3536ZM11.3536 15.3536C11.2598 15.4473 11.1326 15.5 11 15.5C10.8674 15.5 10.7402 15.4473 10.6464 15.3536C10.5527 15.2598 10.5 15.1326 10.5 15V9C10.5 8.86739 10.5527 8.74022 10.6464 8.64645C10.7402 8.55268 10.8674 8.5 11 8.5C11.1326 8.5 11.2598 8.55268 11.3536 8.64645C11.4473 8.74022 11.5 8.86739 11.5 9V15C11.5 15.1326 11.4473 15.2598 11.3536 15.3536Z"
                  fill="#333333"
                  stroke="#333333"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
