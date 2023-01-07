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
      className="max-w-sm w-full flex flex-col items-start p-[20px] gap-[8px] border-2 bg-primary/10 rounded-[4px] border-primary">
      <h1>{todo.title}</h1>
      <h2>January - March</h2>
      {data &&
        data.map((item) => {
          // console.log(item);
          if (item.todo_id !== todo.id) return null;

          return (
            <div class="flex flex-col w-full h-[40] bg-white p-[10px]">
              <h3 class="font-bold text-[14px]">{item.name}</h3>
              <div class="flex justify-between items-center">
                <div className="flex items-center gap-2 w-3/4">
                  <div class={`bg-black w-full h-[15px] rounded-[8px]`}>
                    <div
                      class={`bg-red-500 z-30 h-[10px] w-[${
                        item.progress_percentage ?? 0
                      }]`}></div>
                  </div>
                  <div>{item.progress_percentage ?? 0}%</div>
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
    <div class="relative inline-block text-left">
      <button onClick={() => setMenu(!menu)}>...</button>
      {menu && (
        <div
          class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1">
          <div class="py-1 p-4 gap-2 flex flex-col" role="none">
            <button class="flex gap-2" onClick={onMoveRight}>
              Move Right
            </button>
            <button class="flex gap-2" onClick={onMoveLeft}>
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
            <button class="flex gap-2">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};
