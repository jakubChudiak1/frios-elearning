import React from "react";
import { useRejectStatusMutation } from "../../api/endpoints/accessesEndpoints";
import { useTranslation } from "react-i18next";
const RejectRequest = ({ userRequest }) => {
  const [rejectStatus] = useRejectStatusMutation();
  const rejectRequestHandler = (access_id) => {
    rejectStatus(access_id);
  };
  const { t } = useTranslation();
  return (
    <p
      className="cursor-pointer capitalize text-[#dc5a5a] hover:text-[#da4a4a]"
      onClick={() => {
        rejectRequestHandler(userRequest?.access_id);
      }}
    >
      {t("request.decline")}{" "}
    </p>
  );
};

export default RejectRequest;
