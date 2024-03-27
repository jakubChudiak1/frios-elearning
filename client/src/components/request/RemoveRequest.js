import React from "react";
import { useDeleteAccessMutation } from "../../api/endpoints/accessesEndpoints";
import { useTranslation } from "react-i18next";
const RemoveRequest = ({ userRequest }) => {
  const [deleteAccess] = useDeleteAccessMutation();
  const removeRequestHandler = (access_id) => {
    deleteAccess(access_id);
  };
  const { t } = useTranslation();
  return (
    <p
      className="cursor-pointer capitalize text-[#a855f7] hover:text-[#b373ef]"
      onClick={() => {
        removeRequestHandler(userRequest?.access_id);
      }}
    >
      {t("request.remove")}
    </p>
  );
};

export default RemoveRequest;
