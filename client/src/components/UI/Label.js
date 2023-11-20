import React from "react";

const Label = ({ text, required, ...props }) => {
  return (
    <label
      id={props.id}
      htmlFor={props.htmlFor}
      className="font-semibold capitalize"
    >
      {text}
      <span className="text-red-500">{required && "*"}</span>
    </label>
  );
};

export default Label;
