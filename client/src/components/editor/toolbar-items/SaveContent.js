import React from "react";

const SaveContent = ({ onClick }) => {
  return (
    <span
      className="cursor-pointer pb-5 pl-1 text-[14px] capitalize"
      onClick={onClick}
    >
      uložiť
    </span>
  );
};

export default SaveContent;
