import React from "react";
import { useLocation, useParams } from "react-router-dom";
import apiConfig from "../../config/api.config";
import { dateFormater } from "../../utils/dateFormatter";
import { useDeleteAccessMutation } from "../../api/endpoints/accessesEndpoints";
import RemoveRequest from "./RemoveRequest";
import AcceptRequest from "./AcceptRequest";
import RejectRequest from "./RejectRequest";
import { useTranslation } from "react-i18next";
const RequestItem = ({ userRequest }) => {
  const [deleteAccess] = useDeleteAccessMutation();
  const { lang } = useParams();
  const location = useLocation();
  const removeRequestHandler = (access_id) => {
    deleteAccess(access_id);
  };
  const { t } = useTranslation();
  return (
    <div className=" grid w-full grid-cols-[1fr] gap-3 border-b border-gray-100 py-2 xs:grid-cols-[1fr_max-content_1fr] sm:grid-cols-[max-content_1fr_max-content]">
      <div className=" hidden h-[7rem] w-[12rem] cursor-pointer overflow-hidden xs:block ">
        <img
          src={apiConfig.images.subjectImage(userRequest?.image_path)}
          alt=""
          className=" h-full w-full object-cover"
        />
      </div>
      <div className="flex cursor-pointer flex-col break-words capitalize">
        <h3 className="no text-[16px] capitalize">
          {userRequest?.subjects_name}
        </h3>
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col items-start gap-2 pt-1 lg:flex-row lg:items-center">
            <div className="flex items-center gap-1 text-[14px]">
              <span className="font-semibold capitalize">
                {t("request.createdBy")}:
              </span>
              <span>{userRequest?.creators_name}</span>
            </div>
            <div className="flex items-center gap-1 text-[14px]">
              <span className="font-semibold capitalize">
                {t("request.category")}:
              </span>
              <span>{userRequest?.subjects_category}</span>
            </div>
            <div className="flex items-center gap-1 text-[14px]">
              <span className="font-semibold capitalize">
                {t("request.chaptersCount")}:
              </span>
              <span>{userRequest?.chapter_count}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[14px]">
            <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-3">
              {location.pathname === `/${lang}/requests` && (
                <div className="flex items-center gap-1">
                  <span className="font-semibold capitalize">
                    {t("request.requestSentBy")}:
                  </span>
                  <span>{userRequest?.users_name}</span>
                </div>
              )}
              <span className="font-semibold capitalize">
                {t("request.requestSent")}:
              </span>
              <span>{dateFormater(userRequest?.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="self-start">
        {location.pathname === `/${lang}/requests` ? (
          <div className="flex flex-col">
            <AcceptRequest userRequest={userRequest} />
            <RejectRequest userRequest={userRequest} />
          </div>
        ) : (
          <RemoveRequest userRequest={userRequest} />
        )}
      </div>
    </div>
  );
};

export default RequestItem;
