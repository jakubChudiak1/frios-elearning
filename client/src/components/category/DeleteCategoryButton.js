import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDeleteCategoryMutation } from "../../api/endpoints/categoriesEndpoints";

const DeleteCategoryButton = ({ category }) => {
  const [deleteCategory] = useDeleteCategoryMutation();
  const deleteCategoryHandler = async () => {
    console.log(category?.category_id);
    await deleteCategory({ categoryId: category?.category_id });
  };
  return (
    <CloseIcon onClick={deleteCategoryHandler} className="cursor-pointer" />
  );
};

export default DeleteCategoryButton;
