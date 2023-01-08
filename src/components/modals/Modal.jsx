const Modal = ({
  show,
  children,
  onClose,
  onAction,
  size,
  title,
  closeIcon,
  bgMainButtonColor = 'bg-primary',
  titleIcon,
}) => {
  if (!show) return null;

  return (
    <div
      // onClick={onClose}
      className="flex fixed top-0 left-0 w-screen h-screen z-50 bg-black/20 justify-center items-center">
      <div
        className={`flex flex-col fixed bg-white z-50 rounded-[10px] shadow-md ${size}`}>
        <div class="flex justify-between p-[24px]">
          <div className="flex gap-2 items-center">
            {titleIcon && (
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 7V9M10 13H10.01M3.07183 17H16.9282C18.4678 17 19.4301 15.3333 18.6603 14L11.7321 2C10.9623 0.666667 9.03778 0.666667 8.26798 2L1.33978 14C0.56998 15.3333 1.53223 17 3.07183 17Z"
                  stroke="#E11428"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}

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
            className={`w-[76px] h-[32px] rounded-[8px] pt-[4px] pb-[4px] pl-[16px] pr-[16px] flex justify-center items-center ${bgMainButtonColor} text-white`}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
