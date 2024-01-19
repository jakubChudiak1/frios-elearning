import React from "react";
import { useRejectStatusMutation } from "../../api/endpoints/accessesEndpoints";
const RejectRequest = ({ userRequest }) => {
  const [rejectStatus] = useRejectStatusMutation();
  const rejectRequestHandler = (access_id) => {
    rejectStatus(access_id);
  };

  return (
    <p
      className="cursor-pointer capitalize text-[#dc5a5a] hover:text-[#da4a4a]"
      onClick={() => {
        rejectRequestHandler(userRequest?.access_id);
      }}
    >
      zamietnuť žiadosť
    </p>
  );
};

export default RejectRequest;
