import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAddSubjectMutation } from "../../api/endpoints/subjectsEndpoints";
import Label from "../UI/Label";
import Input from "../UI/Input";
import ErrorMessage from "../UI/ErrorMessage";
import { Close, DiscFull } from "@mui/icons-material";
import CategorySelect from "../category/CategorySelect";
import Button from "../UI/Button";
import Editor from "../editor/Editor";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../language/LanguageSelect";
import { useGetCategoriesListQuery } from "../../api/endpoints/categoriesEndpoints";
import CenterModal from "../UI/CenterModal";

const AddSubjectForm = React.forwardRef(
  ({ closeAddSubjectModalHandler }, ref) => {
    const [addSubject] = useAddSubjectMutation();
    const { data: categories } = useGetCategoriesListQuery();

    const { t } = useTranslation();
    const addSubjectForm = useFormik({
      initialValues: {
        name: "",
        subject_code: "",
        category_id: categories.length > 0 ? categories[0].category_id : "",
        image: null,
        is_public: false,
        is_visible: true,
        description: "",
        language_id: 1,
      },
      validationSchema: Yup.object({
        name: Yup.string().required(t("createSubject.nameRequired")),
        subject_code: Yup.string().nullable(),
        category_id: Yup.number().required("category is required"),
        image: Yup.mixed().required(t("createSubject.imageRequired")),
        is_public: Yup.bool().required(""),
        is_visible: Yup.bool().required(""),
        description: Yup.string(),
        language_id: Yup.number().required(""),
      }),
      onSubmit: async (values) => {
        try {
          const formData = new FormData();
          formData.append("category_id", values.category_id);
          formData.append("subject_code", values.subject_code);
          formData.append("name", values.name);
          formData.append("is_public", values.is_public ? 1 : 0);
          formData.append("is_visible", values.is_visible ? 1 : 0);
          if (values.image) {
            formData.append("upload", values.image);
          }
          formData.append("description", values.description);
          formData.append("language_id", values.language_id);
          await addSubject(formData);
          closeAddSubjectModalHandler();
          addSubjectForm.resetForm();
        } catch (error) {
          console.log("pes");
        }
      },
    });
    return (
      <CenterModal>
        <div
          className="z-[10000] mx-2 mt-2 min-w-[280px] overflow-hidden  rounded-md bg-white p-1 sm:w-[480px] sm:p-3 md:mt-0 md:w-[650px] xl:w-[768px]"
          ref={ref}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] capitalize">
              {t("headers.createSubject")}
            </h2>
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
                <Label text={t("createSubject.subjectsName")} required={true} />
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
                <Label
                  text={t("createSubject.subjectsCode")}
                  required={false}
                />
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
                <Label text={t("createSubject.subjectsCode")} required={true} />
                <CategorySelect
                  onBlur={addSubjectForm.handleBlur}
                  onChange={addSubjectForm.handleChange}
                  defaultValue={addSubjectForm.values.category_id}
                  categories={categories}
                />
                <ErrorMessage
                  message={
                    addSubjectForm.errors.category_id &&
                    addSubjectForm.touched.category_id &&
                    addSubjectForm.errors.category_id
                  }
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 ">
                <div className="flex  flex-col gap-1">
                  <Label
                    text={t("createSubject.subjectsStatus")}
                    required={false}
                  />
                  <LanguageSelect
                    defaultValue={addSubjectForm.values.language_id}
                    onBlur={addSubjectForm.handleBlur}
                    onChange={addSubjectForm.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-3 ">
              <div className="flex  flex-col gap-1">
                <Label
                  text={t("createSubject.subjectsStatus")}
                  required={false}
                />
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
                  <p className="capitalize">
                    {t("createSubject.subjectPublic")}
                  </p>
                </div>
              </div>
              <div className="flex  flex-col gap-1">
                <Label
                  text={t("createSubject.subjectVisible")}
                  required={false}
                />
                <div className="flex items-center gap-1">
                  <Input
                    type="checkbox"
                    name="is_visible"
                    className={`self-center  border border-black px-1 py-2 outline-none ${
                      addSubjectForm.touched.is_public &&
                      addSubjectForm.errors.is_public
                        ? "border-red-500"
                        : "border-black"
                    }`}
                    checked={addSubjectForm.values.is_visible}
                    onBlur={addSubjectForm.handleBlur}
                    onChange={addSubjectForm.handleChange}
                  />
                  <p className="capitalize">
                    {t("createSubject.subjectVisible")}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-full pt-2">
              <div className="flex w-full flex-col gap-1">
                <Label
                  text={t("createSubject.subjectsDescription")}
                  required={false}
                />
                <Editor
                  data={addSubjectForm.values.description}
                  isHandler={false}
                  onChange={(content) =>
                    addSubjectForm.setFieldValue("description", content)
                  }
                  height="h-36"
                />
              </div>
            </div>

            <div className="flex pt-2">
              <div className="flex flex-1 flex-col gap-1">
                <Label
                  text={t("createSubject.subjectsImage")}
                  required={true}
                />
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
              className=" w-full self-baseline bg-purple-500 p-2 capitalize text-white md:w-auto"
            >
              {t("createSubject.submit")}
            </Button>
          </form>
        </div>
      </CenterModal>
    );
  },
);

export default AddSubjectForm;
