import React from "react";
import { useLocation } from "react-router-dom";
import apiConfig from "../../config/api.config";
import { dateFormater } from "../../utils/dateFormatter";
import { useDeleteAccessMutation } from "../../api/endpoints/accessesEndpoints";
import RemoveRequest from "./RemoveRequest";
import AcceptRequest from "./AcceptRequest";
import RejectRequest from "./RejectRequest";
const RequestItem = ({ userRequest }) => {
  const [deleteAccess] = useDeleteAccessMutation();
  const location = useLocation();
  const removeRequestHandler = (access_id) => {
    deleteAccess(access_id);
  };
  console.log(location);
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
              <span className="font-semibold capitalize">vytvoril:</span>
              <span>{userRequest?.creators_name}</span>
            </div>
            <div className="flex items-center gap-1 text-[14px]">
              <span className="font-semibold capitalize">kategoria:</span>
              <span>{userRequest?.subjects_category}</span>
            </div>
            <div className="flex items-center gap-1 text-[14px]">
              <span className="font-semibold capitalize">počet kapitol:</span>
              <span>{userRequest?.chapter_count}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[14px]">
            <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-3">
              {location.pathname === "/requests" && (
                <div className="flex items-center gap-1">
                  <span className="font-semibold capitalize">
                    žiadosť poslal:
                  </span>
                  <span>{userRequest?.users_name}</span>
                </div>
              )}
              <span className="font-semibold capitalize">
                žiadosť odoslaná:
              </span>
              <span>{dateFormater(userRequest?.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="self-start">
        {location.pathname === "/requests" ? (
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
