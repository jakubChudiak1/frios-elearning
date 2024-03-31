import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const ArrowForward = ({ text, onClick }) => {
  return (
    <div
      className="flex cursor-pointer items-center capitalize text-[#a855f7]"
      onClick={onClick}
    >
      <p>{text}</p>
      <ArrowForwardIosIcon />
    </div>
  );
};

export default ArrowForward;
