import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteCategoryButton from "./DeleteCategoryButton";
import { useSelector } from "react-redux";
import UpdateCategoryForm from "./UpdateCategoryForm";
import { useAuth } from "../../context/authContext";

const CategoryItem = ({ category }) => {
  const navigate = useNavigate();
  const { editModeState } = useSelector((state) => state.editModeState);
  const { user } = useAuth();
  const categoryHandler = () => {
    navigate(`subjects/category?q=${category?.name}`);
  };

  return (
    <div className="relative cursor-pointer  whitespace-nowrap rounded-lg bg-gray-100 px-3 py-2 capitalize  hover:bg-gray-200">
      {!editModeState ? (
        <div className="flex items-center">
          <div onClick={categoryHandler}>{category?.name}</div>
        </div>
      ) : (
        <div className=" relative flex items-center">
          <UpdateCategoryForm category={category} />
          {user?.role_id === 1 ? (
            <DeleteCategoryButton category={category} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
