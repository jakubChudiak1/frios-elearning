import React from "react";
import { useDeleteAccessMutation } from "../../api/endpoints/accessesEndpoints";
const RemoveRequest = ({ userRequest }) => {
  const [deleteAccess] = useDeleteAccessMutation();
  const removeRequestHandler = (access_id) => {
    deleteAccess(access_id);
  };
  return (
    <p
      className="cursor-pointer capitalize text-[#a855f7] hover:text-[#b373ef]"
      onClick={() => {
        removeRequestHandler(userRequest?.access_id);
      }}
    >
      odstrániť žiadosť
    </p>
  );
};

export default RemoveRequest;
