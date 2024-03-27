import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteCategoryButton from "./DeleteCategoryButton";
import { useSelector } from "react-redux";
import UpdateCategoryForm from "./UpdateCategoryForm";

const CategoryItem = ({ category }) => {
  const navigate = useNavigate();
  const { editModeState } = useSelector((state) => state.editModeState);

  const categoryHandler = () => {
    navigate(`subjects/category?q=${category?.name}`);
  };

  return (
    <div className="relative cursor-pointer  whitespace-nowrap rounded-lg bg-gray-100 px-3 py-2 capitalize  hover:bg-gray-200">
      {!editModeState ? (
        <div className="flex items-center">
          <div onClick={categoryHandler}>{category?.name}</div>
          {editModeState ? <DeleteCategoryButton category={category} /> : null}
        </div>
      ) : (
        <div className=" relative flex items-center">
          <UpdateCategoryForm category={category} />
          <DeleteCategoryButton category={category} />
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
