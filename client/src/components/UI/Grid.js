import React from "react";

const Grid = ({ text, children }) => {
  return (
    <div className="mt-1 flex flex-col">
      <h2 className=" capitalize">{text}</h2>
      <div className="mt-4 grid auto-rows-fr grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {children}
      </div>
    </div>
  );
};

export default Grid;
