import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Input from "../UI/Input";
import Button from "../UI/Button";
import EditIcon from "@mui/icons-material/Edit";
import { useUpdateCategoryMutation } from "../../api/endpoints/categoriesEndpoints";

const UpdateCategoryForm = ({ category }) => {
  const [updateCategory] = useUpdateCategoryMutation();
  const updateCategoryForm = useFormik({
    initialValues: {
      name: category?.name || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(""),
    }),
    onSubmit: async (values) => {
      await updateCategory({
        categoryId: category?.category_id,
        name: values.name,
      });
    },
  });

  return (
    <form
      onSubmit={updateCategoryForm.handleSubmit}
      className=" h-full w-full "
    >
      <div className=" flex items-center">
        <Input
          name="name"
          value={updateCategoryForm.values.name}
          onChange={updateCategoryForm.handleChange}
          onBlur={updateCategoryForm.handleBlur}
          className=" bg-transparent outline-none"
        />
        <Button type="submit">
          <EditIcon />
        </Button>
      </div>
    </form>
  );
};

export default UpdateCategoryForm;
