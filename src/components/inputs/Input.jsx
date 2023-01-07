const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        name={name}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className="pt-[8px] pb-[8px] pl-[16px] pr-[16px] rounded-[8px] h-[40px] border-2 border-neutral-400 focus:border-primary"
      />
    </div>
  );
};

export default Input;
