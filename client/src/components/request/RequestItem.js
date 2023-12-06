import React from "react";
import apiConfig from "../../config/api.config";
import { dateFormater } from "../../utils/dateFormatter";
import { useDeleteAccessMutation } from "../../api/endpoints/accessesEndpoints";
const RequestItem = ({ userRequest }) => {
  const [deleteAccess] = useDeleteAccessMutation();

  const removeRequestHandler = (access_id) => {
    deleteAccess(access_id);
  };

  return (
    <div className=" grid w-full grid-cols-[1fr_2fr_1fr] gap-3 border-b border-gray-100 py-2">
      <div className="aspect-[1/.45] h-auto  cursor-pointer overflow-hidden">
        <img
          src={apiConfig.images.subjectImage(userRequest?.image_path)}
          alt=""
          className=" h-full w-full object-cover"
        />
      </div>
      <div className="flex cursor-pointer flex-col break-words">
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
            <span className="font-semibold capitalize">žiadosť odoslaná:</span>
            <span>{dateFormater(userRequest?.created_at)}</span>
          </div>
        </div>
      </div>
      <div className="self-start">
        <p
          className="cursor-pointer capitalize text-[#a855f7] hover:text-[#b373ef]"
          onClick={() => {
            removeRequestHandler(userRequest?.access_id);
          }}
        >
          odstrániť žiadosť
        </p>
      </div>
    </div>
  );
};

export default RequestItem;
