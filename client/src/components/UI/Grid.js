import React from "react";

const Grid = ({ text, children }) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-[20px]">{text}</h2>
      <div className="mt-4 grid auto-rows-fr grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {children}
      </div>
    </div>
  );
};

export default Grid;
