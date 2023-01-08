const TextArea = ({ label, name, value, onChange, error, placeholder }) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <label htmlFor={name}>{label}</label>
      <textarea
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="pt-[8px] pb-[8px] pl-[16px] pr-[16px] rounded-[8px] h-[88px] border-2 border-neutral-400 focus:border-primary active:border-primary focus:outline-none text-textdark"
        style={{ resize: 'none' }}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default TextArea;
