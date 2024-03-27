import React from "react";
import { useAcceptStatusMutation } from "../../api/endpoints/accessesEndpoints";
import { useTranslation } from "react-i18next";
const AcceptRequest = ({ userRequest }) => {
  const [acceptStatus] = useAcceptStatusMutation();
  const acceptRequestHandler = (access_id) => {
    acceptStatus(access_id);
  };
  const { t } = useTranslation();
  return (
    <p
      className="cursor-pointer capitalize text-[#3fb53f] hover:text-[#2da32d]"
      onClick={() => {
        acceptRequestHandler(userRequest?.access_id);
      }}
    >
      {t("request.accept")}
    </p>
  );
};

export default AcceptRequest;
