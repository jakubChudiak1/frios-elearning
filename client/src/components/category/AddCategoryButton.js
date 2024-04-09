import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useAddCategoryMutation } from "../../api/endpoints/categoriesEndpoints";
import { useTranslation } from "react-i18next";
import Button from "../UI/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
const AddCategoryButton = () => {
  const [addCategory] = useAddCategoryMutation();
  const { t } = useTranslation();
  const addCategoryForm = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(""),
    }),
    onSubmit: async (values, { resetForm }) => {
      await addCategory({ name: values.name });
      resetForm();
    },
  });
  return (
    <form
      className="form relative h-full  cursor-pointer items-center overflow-hidden   whitespace-nowrap rounded-lg bg-gray-100 px-3 py-2   hover:bg-gray-200"
      onSubmit={addCategoryForm.handleSubmit}
    >
      <Button type="submit">
        <AddIcon fontSize="medium" />
      </Button>
      <input
        id="text"
        autoComplete="off"
        value={addCategoryForm.values.name}
        onBlur={addCategoryForm.handleBlur}
        onChange={addCategoryForm.handleChange}
      />
      <label htmlFor="text" className="label-name">
        <span className="content-name capitalize">
          {t("createCategory.createCategory")}
        </span>
      </label>
    </form>
  );
};

export default AddCategoryButton;
