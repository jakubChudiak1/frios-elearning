import React from "react";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAddAccessToUserMutation } from "../../../api/endpoints/accessesEndpoints";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
const UsersWithoutAccessTableBody = ({ user }) => {
  const { subject_id } = useParams();
  const [addAccessToUser] = useAddAccessToUserMutation();
  const { t } = useTranslation();
  const addAccessForm = useFormik({
    initialValues: {
      editable: false,
    },
    validationSchema: Yup.object({
      editable: Yup.bool().optional(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      await addAccessToUser({
        subject_id: subject_id,
        user_id: user?.user_id,
        editable: values.editable,
      });
    },
  });

  return (
    <form
      className="grid w-full grid-cols-4 pt-1 capitalize"
      onSubmit={addAccessForm.handleSubmit}
    >
      <div className="py-1">
        <p>{user?.users_name}</p>
      </div>
      <div className="py-1">
        <p>{user?.roles_name}</p>
      </div>
      <div className="py-1">
        <Input
          type="checkbox"
          name="editable"
          checked={addAccessForm.values.editable}
          disabled={user?.role_id === 3}
          onBlur={addAccessForm.handleBlur}
          onChange={addAccessForm.handleChange}
        />
      </div>
      <Button
        type="submit"
        className="cursor-pointer py-1 text-left capitalize text-[#a855f7]"
      >
        {t("subjectsUsers.add")}
      </Button>
    </form>
  );
};

export default UsersWithoutAccessTableBody;
