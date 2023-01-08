import {
  createItem,
  deleteItem,
  getItems,
  moveItem,
  updateItem,
} from 'services/items';
import { useCallback, useEffect, useState } from 'react';

import Menu from 'components/modals/Menu';
import TaskModal from 'components/modals/TaskModal';
import { useTodos } from 'store/TodosProvider';

const Todos = ({ todo, bgColor, textColor, periode }) => {
  const { todos } = useTodos();
  const [data, setData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleCreate = async (input) => {
    const res = await createItem(input, todo.id);

    setData((prev) => [res.data, ...prev]);
  };

  const handleUpdate = async (input, itemId) => {
    await updateItem(todo.id, itemId, input);

    const index = data.findIndex((item) => item.id === itemId);

    const newData = [...data];

    const updatedItem = {
      ...newData[index],
      ...input,
    };

    newData[index] = updatedItem;
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

      window.location.reload();
    },
    [todo.id, todos]
  );

  return (
    <div
      key={todo.id}
      className={`max-w-md w-full flex flex-col h-min items-start p-[20px] gap-[8px] border-2 rounded-[4px] ${bgColor}`}>
      <h1
        className={`border ${bgColor} ${textColor} py-[4px] px-[8px] rounded-[4px] min-w-[72px] text-center font-normal`}>
        {todo.title}
      </h1>
      <h2 className="text-textdark font-bold text-[12px]">{periode}</h2>
      {data && data.length > 0 ? (
        data.map((item) => {
          if (item.todo_id !== todo.id) return null;

          return (
            <div className="flex flex-col w-full h-[120px] rounded-[4px] bg-bggrey border border-bordergrey p-[16px]">
              <h3 className="font-bold text-[14px] h-full text-textdark">
                {item.name}
              </h3>
              <div className="flex justify-between items-center border-t border-borderdash border-dashed pt-3">
                <div className="flex items-center gap-2 w-3/4">
                  <div className="bg-[#EDEDED] h-[15px] w-full rounded-full flex items-center ">
                    <div
                      style={{ width: `${item.progress_percentage}%` }}
                      className={`${
                        item.progress_percentage === 100
                          ? 'bg-success'
                          : 'bg-primary'
                      } h-[15px] rounded-l-full`}></div>
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
                    <div className="text-[12px] text-[#757575] font-normal">
                      {item.progress_percentage ?? 0}%
                    </div>
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
                  onDelete={async () => {
                    await deleteItem(todo.id, item.id);

                    setData((prev) => prev.filter((d) => d.id !== item.id));
                  }}
                />
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col w-full h-[40px] rounded-[4px] bg-bggrey border border-bordergrey py-[8px] px-[16px]">
          <h3 className="font-bold text-[14px] h-full text-textdark">
            No Tasks
          </h3>
        </div>
      )}

      <TaskModal
        isCreate
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onOpen={() => setIsAddModalOpen(true)}
        todoId={todo.id}
        onAction={(input) => {
          handleCreate({
            name: input.name,
            progress_percentage: input.progress,
          });

          setIsAddModalOpen(false);
        }}
      />
    </div>
  );
};

export default Todos;
