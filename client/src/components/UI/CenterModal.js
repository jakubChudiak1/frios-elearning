import React from "react";

const CenterModal = (props) => {
  return (
    <div className="absolute left-0 top-0 flex w-full items-center justify-center md:h-full">
      {props.children}
    </div>
  );
};

export default CenterModal;
