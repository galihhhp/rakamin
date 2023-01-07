import Modal from 'components/modals/Modal';
import { useState } from 'react';

const ConfirmationModal = ({ title, message, onConfirm, onCancel }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow(true)}>Show Modal</button>

      <Modal show={show} onHide={() => setShow(false)}>
        <div className="flex flex-col gap-2">
          <h1>{title}</h1>
          <p>{message}</p>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
