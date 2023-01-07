import { useDispatch, useSelector } from 'react-redux';

import Input from 'components/inputs/Input';
import Modal from 'components/modals/Modal';
import TextArea from 'components/inputs/TextArea';
import { createNewTodo } from 'store/features/todosSlice';
import { useState } from 'react';
import { useTodos } from 'store/TodosProvider';

const AddGroupModal = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const { handleCreateGroup } = useTodos();

  const handleCreate = () => {
    handleCreateGroup({ title, description });

    handleModal();
  };

  const handleModal = () => setIsOpen(!isOpen);

  return (
    <div>
      <button
        onClick={handleModal}
        className="bg-primary text-white rounded-md p-2">
        + Add New Group
      </button>

      <Modal
        show={isOpen}
        onClose={handleModal}
        onAction={handleCreate}
        size="w-[420px] h-[369px]"
        title="Add New Group">
        <Input
          name="title"
          placeholder="Title"
          label="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextArea
          label="Description"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Modal>
    </div>
  );
};

export default AddGroupModal;
