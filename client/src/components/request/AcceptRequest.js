import React from "react";
import { useAcceptStatusMutation } from "../../api/endpoints/accessesEndpoints";
const AcceptRequest = ({ userRequest }) => {
  const [acceptStatus] = useAcceptStatusMutation();
  const acceptRequestHandler = (access_id) => {
    acceptStatus(access_id);
  };
  return (
    <p
      className="cursor-pointer capitalize text-[#3fb53f] hover:text-[#2da32d]"
      onClick={() => {
        acceptRequestHandler(userRequest?.access_id);
      }}
    >
      prijať žiadosť
    </p>
  );
};

export default AcceptRequest;
