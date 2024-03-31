const Input = (props) => {
  return (
    <input
      id={props.id}
      name={props.name}
      className={props.className}
      placeholder={props.placeholder}
      disabled={props.disabled}
      type={props.type}
      onBlur={props.onBlur}
      onChange={props.onChange}
      checked={props.checked}
      value={props.value}
      autoComplete="off"
    />
  );
};

export default Input;
