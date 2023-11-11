import React from "react";

const BackdropImage = ({ imagePath, alt }) => {
  return (
    <img src={imagePath} alt={alt} className="h-full w-full object-cover" />
  );
};

export default BackdropImage;
