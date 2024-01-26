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

const UpdateSubjectForm = React.forwardRef(
  ({ subject_id, subject, closeUpdateSubjectModalHandler }, ref) => {
    const [updateSubject] = useUpdateSubjectMutation();
    const updateSubjectForm = useFormik({
      initialValues: {
        name: subject?.subjects_name,
        subject_code: subject?.subject_code,
        category_id: subject?.category_id,
        is_public: subject?.is_public ? 1 : 0,
        description: subject?.description,
      },
      validationSchema: Yup.object({
        name: Yup.string().required("name is required"),
        subject_code: Yup.string().nullable(),
        category_id: Yup.number().required("category is required"),
        is_public: Yup.bool(),
        description: Yup.string(),
      }),
      onSubmit: async (values) => {
        try {
          await updateSubject({
            subjectId: subject_id,
            category_id: values.category_id,
            subject_code: values.subject_code,
            name: values.name,
            is_public: values.is_public ? 1 : 0,
            description: values.description,
          });
          closeUpdateSubjectModalHandler();
        } catch (error) {
          console.error(error);
        }
      },
    });
    const handleClickInsideForm = (event) => {
      event.stopPropagation();
    };
    return (
      <div
        className="lg:top-[55%], absolute left-[50%] top-[50%]  z-[10000] w-[90%] -translate-x-1/2 -translate-y-1/2 transform overflow-x-hidden rounded-[10px] bg-white p-3  xs:w-[30rem] md:p-7 lg:left-[55%]  lg:w-[45rem] "
        ref={ref}
        onClick={handleClickInsideForm}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] capitalize">upravte predmet</h2>
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
              <Label text={"názov predmetu"} required={true} />
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
              <Label text={"kód predmetu"} required={false} />
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
              <Label text={"kategória predmetu  "} required={true} />
              <CategorySelect
                onBlur={updateSubjectForm.handleBlur}
                onChange={updateSubjectForm.handleChange}
                defaultValue={updateSubjectForm.values.category_id}
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
              <Label text={"Status"} required={false} />
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
                <p className="capitalize">verejný</p>
              </div>
            </div>
          </div>
          <div className="flex w-full pt-2">
            <div className="flex w-full flex-col gap-1">
              <Label text={"popis"} required={false} />
              <textarea
                name="description"
                value={updateSubjectForm.values.description}
                rows="5"
                className="w-full border border-black p-1 outline-none"
                onChange={updateSubjectForm.handleChange}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="mt-2 w-full self-baseline bg-purple-500 p-2 capitalize text-white md:w-auto"
          >
            upraviť predmet
          </Button>
        </form>
      </div>
    );
  },
);

export default UpdateSubjectForm;
