import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Label from "../UI/Label";
import Input from "../UI/Input";
import ErrorMessage from "../UI/ErrorMessage";
import { Close } from "@mui/icons-material";
import CategorySelect from "../category/CategorySelect";
import Button from "../UI/Button";
import { useUpdateSubjectMutation } from "../../api/endpoints/subjectsEndpoints";
import Editor from "../editor/Editor";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../language/LanguageSelect";
import { useGetCategoriesListQuery } from "../../api/endpoints/categoriesEndpoints";
import CenterModal from "../UI/CenterModal";

const UpdateSubjectForm = React.forwardRef(
  ({ subject_id, subject, closeUpdateSubjectModalHandler }, ref) => {
    const [updateSubject] = useUpdateSubjectMutation();
    const { data: categories } = useGetCategoriesListQuery();
    const { t } = useTranslation();

    const updateSubjectForm = useFormik({
      initialValues: {
        name: subject?.subjects_name,
        subject_code: subject?.subject_code,
        category_id: subject?.category_id,
        is_public: subject?.is_public ? 1 : 0,
        is_visible: subject?.is_visible ? 1 : 0,
        description: subject?.description,
        language_id: subject?.language_id,
      },
      validationSchema: Yup.object({
        name: Yup.string().required(t("updateSubject.nameRequired")),
        subject_code: Yup.string().nullable(),
        category_id: Yup.number().required("category is required"),
        is_public: Yup.bool().required(""),
        is_visible: Yup.bool().required(""),
        description: Yup.string(),
        language_id: Yup.number().required(""),
      }),
      onSubmit: async (values) => {
        try {
          await updateSubject({
            subjectId: subject_id,
            category_id: values.category_id,
            subject_code: values.subject_code,
            name: values.name,
            is_public: values.is_public ? 1 : 0,
            is_visible: values.is_visible ? 1 : 0,
            description: values.description,
            language_id: values.language_id,
          });
          closeUpdateSubjectModalHandler();
        } catch (error) {
          console.log(error);
        }
      },
    });
    const handleClickInsideForm = (event) => {
      event.stopPropagation();
    };
    return (
      <CenterModal>
        <div
          className="z-[10000] mx-2 mt-2 min-w-[280px]  overflow-hidden rounded-md bg-white p-1 sm:w-[480px] sm:p-3 md:w-[650px] xl:w-[768px] "
          ref={ref}
          onClick={handleClickInsideForm}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] capitalize">
              {t("headers.updateSubject")}
            </h2>
            <Close
              className="cursor-pointer"
              fontSize="large"
              onClick={closeUpdateSubjectModalHandler}
            />
          </div>
          <form
            onSubmit={updateSubjectForm.handleSubmit}
            className="mt-3 flex flex-col gap-2"
          >
            <div className="flex flex-col gap-3 pt-2 lg:flex-row">
              <div className="flex flex-1 flex-col gap-1">
                <Label text={t("updateSubject.subjectsName")} required={true} />
                <Input
                  type="text"
                  name="name"
                  className={`border border-black px-1 py-2 outline-none ${
                    updateSubjectForm.touched.name &&
                    updateSubjectForm.errors.name
                      ? "border-red-500"
                      : "border-black"
                  }`}
                  value={updateSubjectForm.values.name}
                  onBlur={updateSubjectForm.handleBlur}
                  onChange={updateSubjectForm.handleChange}
                />
                <ErrorMessage
                  message={
                    updateSubjectForm.errors.name &&
                    updateSubjectForm.touched.name &&
                    updateSubjectForm.errors.name
                  }
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <Label
                  text={t("updateSubject.subjectsCode")}
                  required={false}
                />
                <Input
                  type="text"
                  name="subject_code"
                  className=" border border-black px-1 py-2 outline-none "
                  value={updateSubjectForm.values.subject_code}
                  onBlur={updateSubjectForm.handleBlur}
                  onChange={updateSubjectForm.handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 pt-2 md:flex-row">
              <div className="flex flex-1 flex-col gap-1">
                <Label
                  text={t("updateSubject.subjectsCategory")}
                  required={true}
                />
                <CategorySelect
                  onBlur={updateSubjectForm.handleBlur}
                  onChange={updateSubjectForm.handleChange}
                  defaultValue={updateSubjectForm.values.category_id}
                  categories={categories}
                />
                <ErrorMessage
                  message={
                    updateSubjectForm.errors.category_id &&
                    updateSubjectForm.touched.category_id &&
                    updateSubjectForm.errors.category_id
                  }
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex  flex-col gap-1">
                  <Label text={t("createSubject.language")} required={false} />
                  <LanguageSelect
                    defaultValue={updateSubjectForm.values.language_id}
                    onBlur={updateSubjectForm.handleBlur}
                    onChange={updateSubjectForm.handleChange}
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
                      updateSubjectForm.touched.is_public &&
                      updateSubjectForm.errors.is_public
                        ? "border-red-500"
                        : "border-black"
                    }`}
                    checked={updateSubjectForm.values.is_public}
                    onBlur={updateSubjectForm.handleBlur}
                    onChange={updateSubjectForm.handleChange}
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
                      updateSubjectForm.touched.is_visible &&
                      updateSubjectForm.errors.is_visible
                        ? "border-red-500"
                        : "border-black"
                    }`}
                    checked={updateSubjectForm.values.is_visible}
                    onBlur={updateSubjectForm.handleBlur}
                    onChange={updateSubjectForm.handleChange}
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
                  text={t("updateSubject.subjectsDescription")}
                  required={false}
                />
                <Editor
                  data={updateSubjectForm.values.description}
                  isHandler={false}
                  onChange={(event) =>
                    updateSubjectForm.setFieldValue("description", event)
                  }
                  height="h-36"
                />
              </div>
            </div>
            <Button
              type="submit"
              className=" w-full self-baseline bg-purple-500 p-2 capitalize text-white md:w-auto"
            >
              {t("updateSubject.updateSubject")}
            </Button>
          </form>
        </div>
      </CenterModal>
    );
  },
);

export default UpdateSubjectForm;
