import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import { useAddCategoryMutation } from "../../api/endpoints/categoriesEndpoints";

const AddCategoryButton = () => {
  const [categoryName, setCategoryName] = useState("");
  const [addCategory] = useAddCategoryMutation();

  const addCategoryHandler = (event) => {
    event.preventDefault();
    addCategory({ name: categoryName });
    setCategoryName("");
  };

  return (
    <form
      className="form relative h-full  cursor-pointer items-center overflow-hidden   whitespace-nowrap rounded-lg bg-gray-100 px-3 py-2   hover:bg-gray-200"
      onSubmit={addCategoryHandler}
    >
      <AddIcon fontSize="medium" />
      <input
        id="text"
        autoComplete="off"
        value={categoryName}
        required
        onChange={(event) => setCategoryName(event.target.value)}
      />
      <label htmlFor="text" className="label-name">
        <span className="content-name capitalize">vytvorte kategóriu</span>
      </label>
    </form>
  );
};

export default AddCategoryButton;
