import React from "react";
import RequestItem from "./RequestItem";

const RequestList = ({ usersRequests }) => {
  return (
    <div className="flex w-full flex-col p-3">
      <h2 className="text-[20px] capitalize">vaše žiadosti</h2>
      <div className="">
        {usersRequests?.map((userRequest) => (
          <RequestItem key={userRequest.access_id} userRequest={userRequest} />
        ))}
      </div>
    </div>
  );
};

export default RequestList;
