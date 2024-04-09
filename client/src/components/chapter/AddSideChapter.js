import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import Input from "../UI/Input";
import { useAddSideChapterMutation } from "../../api/endpoints/chaptersEndpoints";
import { useTranslation } from "react-i18next";
import Button from "../UI/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
const AddSideChapter = ({ mainChapter }) => {
  const { subject_id } = useParams();
  const [addSideChapter] = useAddSideChapterMutation();
  const { t } = useTranslation();
  const addSideChapterForm = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(""),
    }),
    onSubmit: async (values, { resetForm }) => {
      await addSideChapter({
        subject_id: subject_id,
        name: values.name,
        main_chapter: mainChapter,
      });
      resetForm();
    },
  });

  return (
    <form
      className="w-full  border-b border-[lightgray] bg-white py-4 font-semibold"
      onSubmit={addSideChapterForm.handleSubmit}
    >
      <div className="flex h-full w-full items-center  pl-[14px]">
        <Button type="submit">
          <AddIcon fontSize="small" />
        </Button>
        <Input
          type="text"
          value={addSideChapterForm.values.name}
          onBlur={addSideChapterForm.handleBlur}
          onChange={addSideChapterForm.handleChange}
          placeholder={t("chapters.createChapter")}
          className="color h-full  w-full bg-transparent text-[12px] placeholder-black outline-none"
        />
      </div>
    </form>
  );
};

export default AddSideChapter;
