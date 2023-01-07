import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Input from 'components/inputs/Input';
import Modal from 'components/modals/Modal';
import { createNewItem } from 'store/features/itemsSlice';
import { createNewTodo } from 'store/features/todosSlice';

const TaskModal = ({ isCreate, todoId, onAction, item }) => {
  const [name, setName] = useState(isCreate ? '' : item.name);
  const [progress, setProgress] = useState(
    isCreate ? '' : item.progress_percentage
  );
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const handleCreate = () => {
    dispatch(createNewItem({ name, progress, todoId }));

    handleModal();
  };
  if (isOpen) console.log(item);
  const handleModal = () => setIsOpen(!isOpen);

  // useEffect(() => {
  //   if (isOpen && item) {
  //     setName(item.name);
  //     setProgress(item.progress);
  //   }
  // }, [isOpen, item]);

  return (
    <div>
      {isCreate ? (
        <button onClick={handleModal} className="rounded-md p-2">
          + Task
        </button>
      ) : (
        <button onClick={handleModal} className="rounded-md p-2">
          Edit
        </button>
      )}

      <Modal
        show={isOpen}
        onClose={handleModal}
        onAction={() => onAction({ name, progress })}
        size="w-[420px] h-[311px]"
        closeIcon
        title={isCreate ? 'Create Task' : 'Edit Task'}>
        <Input
          name="name"
          placeholder="Type your Task"
          label="Task"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          name="progress"
          placeholder="70%"
          label="Progress"
          value={progress}
          onChange={(e) => {
            setProgress(e.target.value);
          }}
        />
      </Modal>
    </div>
  );
};

export default TaskModal;
