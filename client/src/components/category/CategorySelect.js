import React from "react";
import { useGetCategoriesListQuery } from "../../api/endpoints/categoriesEndpoints";
const CategorySelect = ({ onBlur, onChange, defaultValue }) => {
  const { data: categories } = useGetCategoriesListQuery();
  return (
    <select
      name="category_id"
      onBlur={onBlur}
      onChange={onChange}
      className="border border-black px-1 py-2 outline-none "
      defaultValue={defaultValue}
    >
      {categories?.map((category) => (
        <option key={category?.category_id} value={category?.category_id}>
          {category?.name}
        </option>
      ))}
    </select>
  );
};

export default CategorySelect;
