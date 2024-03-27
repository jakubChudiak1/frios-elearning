import React from "react";
const CategorySelect = ({ categories, onBlur, onChange, defaultValue }) => {
  return (
    <select
      name="category_id"
      onBlur={onBlur}
      onChange={onChange}
      className="border border-black px-1 py-2 capitalize outline-none "
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
