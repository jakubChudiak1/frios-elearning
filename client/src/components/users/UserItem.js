import React, { useTransition } from "react";
import Button from "../UI/Button";
import RolesSelect from "../roles/RolesSelect";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useChangeUsersRoleMutation } from "../../api/endpoints/usersEndpoints";
import { useTranslation } from "react-i18next";

const UserItem = ({ user }) => {
  const [changeUsersRole] = useChangeUsersRoleMutation();
  const { t } = useTranslation();
  const changeRoleForm = useFormik({
    initialValues: {
      role_id: user?.role_id,
    },
    validationSchema: Yup.object({
      role_id: Yup.number().required(),
    }),
    onSubmit: async (values) => {
      try {
        await changeUsersRole({
          user_id: user?.user_id,
          role_id: values.role_id,
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <form
      className="grid w-full grid-cols-4 px-2"
      onSubmit={changeRoleForm.handleSubmit}
    >
      <div className="py-1 capitalize">{user?.users_name}</div>
      <div className="py-1">{user?.email}</div>
      <div className="py-1 capitalize">
        <RolesSelect
          defaultValue={changeRoleForm.values.role_id}
          onBlur={changeRoleForm.handleBlur}
          onChange={changeRoleForm.handleChange}
        />
      </div>
      <div className="py-1 ">
        <Button
          type="submit"
          className=" bg-[#a855f7] px-4 py-2 capitalize text-white"
        >
          {t("usersList.submit")}
        </Button>
      </div>
    </form>
  );
};

export default UserItem;
