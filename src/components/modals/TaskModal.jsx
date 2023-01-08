import Input from 'components/inputs/Input';
import Modal from 'components/modals/Modal';
import { useState } from 'react';

const TaskModal = ({ isCreate, onAction, item, onOpen, onClose, isOpen }) => {
  const [name, setName] = useState(isCreate ? '' : item.name);
  const [progress, setProgress] = useState(
    isCreate ? '' : item.progress_percentage
  );

  return (
    <div>
      {isCreate ? (
        <button
          onClick={onOpen}
          className="rounded-md p-2 flex justify-center items-center gap-[6.67px] text-textgrey font-normal text-[12px]">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.33317 8.16663V8.66663H9.83317H12.3332C12.4216 8.66663 12.5064 8.70175 12.5689 8.76426C12.6314 8.82677 12.6665 8.91155 12.6665 8.99996C12.6665 9.08836 12.6314 9.17315 12.5689 9.23566C12.5064 9.29817 12.4216 9.33329 12.3332 9.33329H9.83317H9.33317V9.83329V12.3333C9.33317 12.4217 9.29806 12.5065 9.23554 12.569C9.17303 12.6315 9.08825 12.6666 8.99984 12.6666C8.91144 12.6666 8.82665 12.6315 8.76414 12.569C8.70163 12.5065 8.66651 12.4217 8.66651 12.3333V9.83329V9.33329H8.16651H5.66651C5.5781 9.33329 5.49332 9.29817 5.43081 9.23566C5.36829 9.17315 5.33317 9.08836 5.33317 8.99996C5.33317 8.91155 5.36829 8.82677 5.4308 8.76426C5.49332 8.70175 5.5781 8.66663 5.66651 8.66663H8.16651H8.66651V8.16663V5.66663C8.66651 5.57822 8.70163 5.49344 8.76414 5.43092C8.82665 5.36841 8.91144 5.33329 8.99984 5.33329C9.08825 5.33329 9.17303 5.36841 9.23554 5.43092C9.29806 5.49344 9.33317 5.57822 9.33317 5.66663V8.16663ZM4.64787 2.48678C5.93606 1.62604 7.45055 1.16663 8.99984 1.16663C10.0285 1.16663 11.0471 1.36924 11.9975 1.7629C12.9479 2.15656 13.8115 2.73356 14.5388 3.46096C15.2662 4.18835 15.8432 5.05189 16.2369 6.00227C16.6306 6.95266 16.8332 7.97127 16.8332 8.99996C16.8332 10.5492 16.3738 12.0637 15.513 13.3519C14.6523 14.6401 13.4289 15.6441 11.9975 16.237C10.5662 16.8299 8.99115 16.985 7.47163 16.6828C5.95212 16.3805 4.55635 15.6345 3.46084 14.539C2.36533 13.4435 1.61927 12.0477 1.31702 10.5282C1.01477 9.00865 1.1699 7.43363 1.76278 6.00227C2.35567 4.57092 3.35969 3.34752 4.64787 2.48678ZM5.01825 14.9588C6.19681 15.7463 7.58241 16.1666 8.99984 16.1666C10.9006 16.1666 12.7234 15.4116 14.0674 14.0676C15.4115 12.7235 16.1665 10.9007 16.1665 8.99996C16.1665 7.58253 15.7462 6.19693 14.9587 5.01837C14.1712 3.83982 13.0519 2.92125 11.7424 2.37882C10.4329 1.8364 8.99189 1.69447 7.60169 1.971C6.2115 2.24753 4.93452 2.93008 3.93224 3.93236C2.92997 4.93464 2.24741 6.21162 1.97088 7.60181C1.69435 8.99201 1.83628 10.433 2.3787 11.7425C2.92113 13.0521 3.8397 14.1713 5.01825 14.9588Z"
              fill="#333333"
              stroke="#333333"
            />
          </svg>
          New Task
        </button>
      ) : (
        <button
          className="flex items-center hover:text-primary font-semibold text-[14px] gap-[18px] w-full"
          onClick={onOpen}>
          <svg
            className="hover:fill-primary"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M7.24289 16.4999L7.24289 16.4999H7.24H3C2.86739 16.4999 2.74021 16.4473 2.64645 16.3535C2.55268 16.2597 2.5 16.1325 2.5 15.9999L2.50001 11.7599L2.49999 11.757C2.49961 11.6912 2.51222 11.626 2.53711 11.5651C2.56186 11.5045 2.59826 11.4494 2.64426 11.4028C2.6445 11.4025 2.64475 11.4023 2.64499 11.402L9.5833 4.47375L9.58418 4.47287L12.4042 1.64287L12.405 1.64204C12.4515 1.59517 12.5068 1.55798 12.5677 1.53259C12.6286 1.50721 12.694 1.49414 12.76 1.49414C12.826 1.49414 12.8914 1.50721 12.9523 1.53259C13.0131 1.55794 13.0684 1.59508 13.1148 1.64185C13.1149 1.64192 13.1149 1.64198 13.115 1.64204L17.3544 5.93141L17.3544 5.93143L17.3579 5.93494C17.4048 5.98142 17.442 6.03672 17.4673 6.09765C17.4927 6.15858 17.5058 6.22393 17.5058 6.28994C17.5058 6.35595 17.4927 6.4213 17.4673 6.48223C17.4421 6.54276 17.4052 6.59773 17.3588 6.64403C17.3585 6.64433 17.3582 6.64464 17.3579 6.64494L14.5202 9.42263L14.5202 9.42261L14.5162 9.42664L7.59789 16.3549C7.59767 16.3552 7.59744 16.3554 7.59722 16.3556C7.55064 16.4016 7.49547 16.4381 7.43484 16.4628C7.37393 16.4877 7.30869 16.5003 7.24289 16.4999ZM13.1136 3.05639L12.76 2.70283L12.4064 3.05639L10.9864 4.47639L10.6329 4.82994L10.9864 5.18349L13.8164 8.01349L14.17 8.36705L14.5236 8.01349L15.9436 6.59349L16.2971 6.23994L15.9436 5.88639L13.1136 3.05639ZM3.64645 11.8164L3.5 11.9628V12.1699V14.9999V15.4999H4H6.83H7.03711L7.18355 15.3535L13.1136 9.42349L13.4671 9.06994L13.1136 8.71639L10.2836 5.88639L9.93 5.53283L9.57645 5.88639L3.64645 11.8164ZM1 19.4999H19C19.1326 19.4999 19.2598 19.5526 19.3536 19.6464C19.4473 19.7402 19.5 19.8673 19.5 19.9999C19.5 20.1325 19.4473 20.2597 19.3536 20.3535C19.2598 20.4473 19.1326 20.4999 19 20.4999H1C0.867391 20.4999 0.740214 20.4473 0.646446 20.3535C0.552679 20.2597 0.5 20.1325 0.5 19.9999C0.5 19.8673 0.552679 19.7402 0.646446 19.6464C0.740214 19.5526 0.867391 19.4999 1 19.4999Z" />
          </svg>
          Edit
        </button>
      )}

      <Modal
        show={isOpen}
        onClose={onClose}
        onAction={() => {
          onAction({ name, progress });

          setName('');
          setProgress('');
        }}
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
