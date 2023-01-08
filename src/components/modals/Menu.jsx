import DeleteModal from 'components/modals/DeleteModal';
import TaskModal from 'components/modals/TaskModal';
import { useState } from 'react';

const Menu = ({ item, onMoveRight, onMoveLeft, onEdit, onDelete }) => {
  // if (!show) return null;
  const [menu, setMenu] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <>
        {menu && (
          <div
            class="fixed inset-0 bg-black/50 z-40"
            aria-hidden="true"
            onClick={() => setMenu(!menu)}
          />
        )}
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
            className="absolute right-0 z-50 origin-top-right rounded-[8px] bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1">
            <div
              className="flex flex-col justify-between w-[320px] h-[160px] p-[20px]"
              role="none">
              <button
                className="flex items-center hover:text-primary hover:fill-primary font-semibold text-[14px] gap-[24px]"
                onClick={onMoveRight}>
                <svg
                  className="hover:fill-primary"
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.4538 6.80069L11.4537 6.80073L11.4575 6.80994C11.5075 6.93167 11.5075 7.06821 11.4575 7.18994L11.4574 7.1899L11.4538 7.19919C11.4306 7.25916 11.396 7.31406 11.3519 7.36091L6.35644 12.3564L6.355 12.3578C6.30852 12.4047 6.25321 12.4419 6.19229 12.4673C6.13136 12.4927 6.06601 12.5057 6 12.5057C5.93399 12.5057 5.86864 12.4927 5.80771 12.4673C5.74679 12.4419 5.69148 12.4047 5.645 12.3578L5.6421 12.3549C5.59524 12.3085 5.55804 12.2532 5.53266 12.1922C5.50727 12.1313 5.4942 12.0659 5.4942 11.9999C5.4942 11.9339 5.50727 11.8686 5.53266 11.8077C5.55804 11.7467 5.59524 11.6914 5.6421 11.6449L5.64302 11.644L8.94302 8.35403L9.7997 7.49994H8.59H1C0.867392 7.49994 0.740215 7.44726 0.646447 7.35349C0.552678 7.25973 0.5 7.13255 0.5 6.99994C0.5 6.86733 0.552678 6.74016 0.646447 6.64639C0.740215 6.55262 0.867392 6.49994 1 6.49994H8.59H9.7997L8.94302 5.64585L5.64355 2.35639C5.6435 2.35633 5.64345 2.35628 5.64339 2.35623C5.54896 2.26171 5.49591 2.13356 5.49591 1.99994C5.49591 1.93374 5.50895 1.86819 5.53428 1.80703C5.55961 1.74588 5.59674 1.6903 5.64355 1.64349C5.73809 1.54896 5.86631 1.49585 6 1.49585C6.0662 1.49585 6.13175 1.50889 6.19291 1.53422C6.25407 1.55955 6.30964 1.59669 6.35645 1.64349L6.70831 1.29163L6.35645 1.64349L11.3519 6.63897C11.396 6.68582 11.4306 6.74073 11.4538 6.80069Z" />
                </svg>
                Move Right
              </button>
              <button
                className="flex items-center hover:text-primary font-semibold text-[14px] gap-[24px]"
                onClick={onMoveLeft}>
                <svg
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  className="hover:fill-primary"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.05688 5.64585L2.20019 6.49994H3.4099H10.9999C11.1325 6.49994 11.2597 6.55262 11.3534 6.64639C11.4472 6.74016 11.4999 6.86733 11.4999 6.99994C11.4999 7.13255 11.4472 7.25973 11.3534 7.35349C11.2597 7.44726 11.1325 7.49994 10.9999 7.49994H3.4099H2.20019L3.05688 8.35403L6.35688 11.644L6.3578 11.6449C6.40466 11.6914 6.44186 11.7467 6.46724 11.8077C6.49263 11.8686 6.50569 11.9339 6.50569 11.9999C6.50569 12.0659 6.49263 12.1313 6.46724 12.1922C6.44186 12.2532 6.40466 12.3085 6.3578 12.3549L6.35778 12.3549L6.3549 12.3578C6.30841 12.4047 6.25311 12.4419 6.19218 12.4673C6.13126 12.4927 6.0659 12.5057 5.9999 12.5057C5.93389 12.5057 5.86854 12.4927 5.80761 12.4673C5.74668 12.4419 5.69138 12.4047 5.6449 12.3578L5.64345 12.3564L0.64797 7.36091C0.603933 7.31407 0.569333 7.25916 0.546081 7.19919L0.546173 7.19915L0.54239 7.18994C0.492381 7.06821 0.492381 6.93167 0.54239 6.80994L0.542481 6.80998L0.546081 6.80069C0.569333 6.74073 0.603932 6.68582 0.647969 6.63898L5.64345 1.64349C5.73799 1.54896 5.8662 1.49585 5.9999 1.49585C6.13359 1.49585 6.26181 1.54896 6.35634 1.64349C6.45088 1.73803 6.50399 1.86625 6.50399 1.99994C6.50399 2.13353 6.45096 2.26166 6.35656 2.35617C6.35649 2.35624 6.35642 2.35632 6.35634 2.35639L3.05688 5.64585Z" />
                </svg>
                Move Left
              </button>
              <TaskModal
                item={item}
                onClose={() => setIsEditOpen(false)}
                onOpen={() => setIsEditOpen(true)}
                isOpen={isEditOpen}
                onAction={(input) => {
                  onEdit({
                    name: input.name,
                    progress_percentage: input.progress,
                  });

                  setIsEditOpen(false);
                  setMenu(false);
                }}
              />
              <DeleteModal
                item={item}
                onAction={() => {
                  onDelete();
                  setIsDeleteOpen(false);
                }}
                onOpen={() => setIsDeleteOpen(true)}
                onClose={() => setIsDeleteOpen(false)}
                isOpen={isDeleteOpen}
              />
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Menu;
