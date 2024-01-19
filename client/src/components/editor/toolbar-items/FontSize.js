import React from "react";

const FontSize = () => {
  return (
    <select className="ql-font">
      <option value="8px">8px</option>
      <option value="10px">10px</option>
      <option value="12px">12px</option>
      <option value="14px" selected>
        14px
      </option>
      <option value="16px">16px</option>
      <option value="18px">18px</option>
      <option value="20px">20px</option>
      <option value="24px">24px</option>
      <option value="36px">36px</option>
    </select>
  );
};

export default FontSize;
