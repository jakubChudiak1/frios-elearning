import React from "react";
import { useNavigate } from "react-router-dom";
const CategoryItem = ({ category }) => {
  const navigate = useNavigate();

  const categoryHandler = () => {
    navigate(`/subjects/category?q=${category?.name}`);
  };

  return (
    <div
      className="cursor-pointer whitespace-nowrap rounded-lg bg-gray-100 px-3 py-2  hover:bg-gray-200"
      onClick={categoryHandler}
    >
      {category?.name}
    </div>
  );
};

export default CategoryItem;
