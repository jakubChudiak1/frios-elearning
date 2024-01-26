import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "../UI/Button";
import { useUpdateDescriptionMutation } from "../../api/endpoints/subjectsEndpoints";
import Label from "../UI/Label";

const UpdateDescriptionForm = ({ subject }) => {
  const [updateDescription] = useUpdateDescriptionMutation();
  const updateDescriptionForm = useFormik({
    initialValues: {
      description: subject?.description,
    },
    validationSchema: Yup.object({
      description: Yup.string(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        await updateDescription({
          subjectId: subject?.subject_id,
          description: values.description,
        });
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <form
      className=" flex w-full flex-col"
      onSubmit={updateDescriptionForm.handleSubmit}
    >
      <textarea
        name="description"
        rows="10"
        value={updateDescriptionForm.values.description}
        className="w-full whitespace-pre break-words border border-black outline-none"
        onChange={updateDescriptionForm.handleChange}
      />
      <Button
        type="submit"
        className="mt-2 w-full self-baseline bg-purple-500 p-2 capitalize text-white md:w-auto"
      >
        <p>upraviť popis</p>
      </Button>
    </form>
  );
};

export default UpdateDescriptionForm;
