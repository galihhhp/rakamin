import { createContext, useContext } from 'react';
import { createItem, getItems } from 'services/items';
import { createTodo, getTodos } from 'services/todos';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const handleCreateGroup = async ({ title, description }) => {
    const res = await createTodo({ title, description });

    setTodos((prev) => [...prev, res.data]);
  };

  const init = useCallback(async () => {
    const res = await getTodos();

    setTodos(res.data);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <TodosContext.Provider value={{ todos, setTodos, handleCreateGroup }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);

export default TodosProvider;
