const Input = (props) => {
  return (
    <input
      id={props.id}
      name={props.name}
      className={props.className}
      placeholder={props.placeholder}
      type={props.type}
      onBlur={props.onBlur}
      onChange={props.onChange}
      value={props.value}
    />
  );
};

export default Input;
