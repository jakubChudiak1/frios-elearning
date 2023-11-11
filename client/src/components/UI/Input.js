const Input = (props) => {
  return (
    <input
      id={props.id}
      className={props.className}
      placeholder={props.placeholder}
      type={props.type}
      onChange={props.onChange}
      value={props.value}
    />
  );
};

export default Input;
