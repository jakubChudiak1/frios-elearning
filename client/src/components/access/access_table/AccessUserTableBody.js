import React from "react";
import Input from "../../UI/Input";
import { useDeleteAccessMutation } from "../../../api/endpoints/accessesEndpoints";
import { dateFormater } from "../../../utils/dateFormatter";
import { useTranslation } from "react-i18next";
const AccessUserTableBody = ({ user }) => {
  const [deleteAccess] = useDeleteAccessMutation();
  const { t } = useTranslation();
  const deleteAccessHandler = async (access_id) => {
    await deleteAccess(access_id);
  };

  return (
    <div className=" grid w-full grid-cols-4 pt-1 capitalize">
      <div className="py-1">
        <p>{user?.users_name}</p>
      </div>
      <div className="py-1">
        <p>{dateFormater(user?.created_at)}</p>
      </div>
      <div className="py-1">
        <Input type="checkbox" checked={user?.editable} onChange={() => {}} />
      </div>
      <div
        className="cursor-pointer py-1 text-[#a855f7]"
        onClick={() => {
          deleteAccessHandler(user?.access_id);
        }}
      >
        <p>{t("subjectsUsers.remove")}</p>
      </div>
    </div>
  );
};

export default AccessUserTableBody;
