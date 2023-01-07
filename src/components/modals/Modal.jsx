const Modal = ({
  show,
  children,
  onClose,
  onAction,
  size,
  title,
  closeIcon,
}) => {
  if (!show) return null;

  return (
    <div
      // onClick={onClose}
      className="flex fixed top-0 left-0 w-screen h-screen bg-black/20 justify-center items-center">
      <div
        className={`flex flex-col fixed bg-white z-50 rounded-[10px] shadow-md ${size}`}>
        <div class="flex justify-between p-[24px]">
          <div className="flex gap-2">
            <h1 className="font-bold text-[18px]">{title}</h1>
          </div>
          {closeIcon && (
            <button onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="h-full pr-[24px] pl-[24px]">{children}</div>
        <div className="flex justify-end gap-2 p-[24px]">
          <button
            onClick={onClose}
            className="w-[76px] h-[32px] border border-neutral-400 rounded-[8px] pt-[4px] pb-[4px] pl-[16px] pr-[16px] flex justify-center items-center">
            Cancel
          </button>
          <button
            onClick={onAction}
            className="w-[76px] h-[32px] border border-neutral-400 rounded-[8px] pt-[4px] pb-[4px] pl-[16px] pr-[16px] flex justify-center items-center">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
