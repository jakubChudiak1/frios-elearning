import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUpdateChaptersNameMutation } from "../../api/endpoints/chaptersEndpoints";
import Input from "../UI/Input";
import Button from "../UI/Button";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const UpdateChaptersName = ({ chapter }) => {
  const { subject_id, chapter_id } = useParams();
  const [updateChaptersName] = useUpdateChaptersNameMutation();
  const updateChaptersNameForm = useFormik({
    initialValues: {
      name: chapter?.name || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      await updateChaptersName({
        subjectId: subject_id,
        chapterId: chapter?.chapter_id,
        name: values.name,
      });
    },
  });

  useEffect(() => {
    updateChaptersNameForm.setValues({ name: chapter?.name || "" });
  }, [chapter]);

  return (
    <form
      onSubmit={updateChaptersNameForm.handleSubmit}
      className="update-chapter-name relative mb-1 flex w-full items-center transition-all"
    >
      <Input
        name="name"
        value={updateChaptersNameForm.values.name}
        onChange={updateChaptersNameForm.handleChange}
        onBlur={updateChaptersNameForm.handleBlur}
        className="w-full text-[18px] font-bold capitalize outline-none xs:text-[20px] lg:text-[28px]"
      />

      <div
        className={`bar absolute top-[100%] flex h-[2px] ${
          updateChaptersNameForm.errors.name ? "bg-red-500" : "bg-[#a855f7]"
        }  transition-all`}
      />
    </form>
  );
};

export default UpdateChaptersName;
