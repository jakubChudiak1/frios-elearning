import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddMainChapterMutation } from "../../api/endpoints/chaptersEndpoints";
import { useParams } from "react-router-dom";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useTranslation } from "react-i18next";

const AddChapter = () => {
  const { subject_id } = useParams();
  const [addMainChapter] = useAddMainChapterMutation();
  const { t } = useTranslation();
  const addChapterForm = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
    }),
    onSubmit: async (values, { resetForm }) => {
      await addMainChapter({ subject_id: subject_id, name: values.name });
      resetForm();
    },
  });

  return (
    <form
      className="w-full  border-b border-[lightgray] bg-gray-50 py-4 font-semibold"
      onSubmit={addChapterForm.handleSubmit}
    >
      <div className="flex h-full w-full items-center gap-1 pl-[4px]">
        <Button>
          <AddIcon />
        </Button>
        <Input
          type="text"
          name="name"
          value={addChapterForm.values.name}
          onChange={addChapterForm.handleChange}
          onBlur={addChapterForm.handleBlur}
          placeholder={t("chapters.createChapter")}
          className="color h-full  w-full bg-transparent text-[14px] placeholder-black outline-none"
        />
      </div>
    </form>
  );
};

export default AddChapter;
