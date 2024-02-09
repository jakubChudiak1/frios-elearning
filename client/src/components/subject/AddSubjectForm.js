import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAddSubjectMutation } from "../../api/endpoints/subjectsEndpoints";
import Label from "../UI/Label";
import Input from "../UI/Input";
import ErrorMessage from "../UI/ErrorMessage";
import { Close } from "@mui/icons-material";
import CategorySelect from "../category/CategorySelect";
import Button from "../UI/Button";
import Editor from "../editor/Editor";

const AddSubjectForm = React.forwardRef(
  ({ closeAddSubjectModalHandler }, ref) => {
    const [addSubject] = useAddSubjectMutation();
    const addSubjectForm = useFormik({
      initialValues: {
        name: "",
        subject_code: "",
        category_id: 1,
        image: null,
        is_public: false,
        description: "",
      },
      validationSchema: Yup.object({
        name: Yup.string().required("name is required"),
        subject_code: Yup.string().nullable(),
        category_id: Yup.number().required("category is required"),
        image: Yup.mixed().required("image is required"),
        is_public: Yup.bool().required("subjects status is required"),
        description: Yup.string(),
      }),
      onSubmit: async (values) => {
        try {
          const formData = new FormData();
          formData.append("category_id", values.category_id);
          formData.append("subject_code", values.subject_code);
          formData.append("name", values.name);
          formData.append("is_public", values.is_public ? 1 : 0);
          if (values.image) {
            formData.append("upload", values.image);
          }
          formData.append("description", values.description);
          await addSubject(formData);
          closeAddSubjectModalHandler();
          addSubjectForm.resetForm();
        } catch (error) {
          console.log(error);
        }
      },
    });
    return (
      <div
        className="absolute left-[50%] top-[70%]  z-[10000] w-[90%] -translate-x-1/2 -translate-y-1/2 transform overflow-x-hidden rounded-[10px] bg-white p-3 xs:w-[28rem]  md:top-[70%] md:p-7 lg:left-[55%]  lg:top-[56%] lg:w-[45rem]"
        ref={ref}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[20px]">Vytvorte predmet</h2>
          <Close
            className="cursor-pointer"
            fontSize="large"
            onClick={closeAddSubjectModalHandler}
          />
        </div>
        <form
          onSubmit={addSubjectForm.handleSubmit}
          className="mt-3 flex flex-col gap-2"
        >
          <div className="flex flex-col gap-3 pt-2 lg:flex-row">
            <div className="flex flex-1 flex-col gap-1">
              <Label text={"názov predmetu"} required={true} />
              <Input
                type="text"
                name="name"
                className={`border border-black px-1 py-2 outline-none ${
                  addSubjectForm.touched.name && addSubjectForm.errors.name
                    ? "border-red-500"
                    : "border-black"
                }`}
                value={addSubjectForm.values.name}
                onBlur={addSubjectForm.handleBlur}
                onChange={addSubjectForm.handleChange}
              />
              <ErrorMessage
                message={
                  addSubjectForm.errors.name &&
                  addSubjectForm.touched.name &&
                  addSubjectForm.errors.name
                }
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <Label text={"kód predmetu"} required={false} />
              <Input
                type="text"
                name="subject_code"
                className=" border border-black px-1 py-2 outline-none "
                value={addSubjectForm.values.subject_code}
                onBlur={addSubjectForm.handleBlur}
                onChange={addSubjectForm.handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-2 md:flex-row">
            <div className="flex flex-1 flex-col gap-1">
              <Label text={"kategória predmetu  "} required={true} />
              <CategorySelect
                onBlur={addSubjectForm.handleBlur}
                onChange={addSubjectForm.handleChange}
                defaultValue={addSubjectForm.values.category_id}
              />
              <ErrorMessage
                message={
                  addSubjectForm.errors.category_id &&
                  addSubjectForm.touched.category_id &&
                  addSubjectForm.errors.category_id
                }
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <Label text={"Status"} required={false} />
              <div className="flex items-center gap-1">
                <Input
                  type="checkbox"
                  name="is_public"
                  className={`self-center  border border-black px-1 py-2 outline-none ${
                    addSubjectForm.touched.is_public &&
                    addSubjectForm.errors.is_public
                      ? "border-red-500"
                      : "border-black"
                  }`}
                  value={addSubjectForm.values.is_public}
                  onBlur={addSubjectForm.handleBlur}
                  onChange={addSubjectForm.handleChange}
                />
                <p className="capitalize">verejný</p>
              </div>
            </div>
          </div>
          <div className="flex w-full pt-2">
            <div className="flex w-full flex-col gap-1">
              <Label text={"popis"} required={false} />
              <Editor
                data={addSubjectForm.values.description}
                onChange={(event) =>
                  addSubjectForm.setFieldValue("description", event)
                }
                height="h-36"
              />
            </div>
          </div>
          <div className="flex pt-2">
            <div className="flex flex-1 flex-col gap-1">
              <Label text={"profilový obrázok"} required={true} />
              <Input
                type="file"
                name="image"
                onChange={(event) => {
                  addSubjectForm.setFieldValue(
                    "image",
                    event.currentTarget.files[0],
                  );
                }}
                className={`self-baseline  py-2 outline-none  ${
                  addSubjectForm.touched.image && addSubjectForm.errors.image
                    ? "text-red-500"
                    : "text-black"
                }`}
              />
              <ErrorMessage
                message={
                  addSubjectForm.errors.image &&
                  addSubjectForm.touched.image &&
                  addSubjectForm.errors.image
                }
              />
            </div>
          </div>
          <Button
            type="submit"
            className="mt-2 w-full self-baseline bg-purple-500 p-2 capitalize text-white md:w-auto"
          >
            vytvoriť predmet
          </Button>
        </form>
      </div>
    );
  },
);

export default AddSubjectForm;
