import React from "react";
import RequestItem from "./RequestItem";
import ArrowBack from "../UI/ArrowBack";
const RequestList = ({ usersRequests, header }) => {
  return (
    <>
      <ArrowBack link={"/"} showed={"hidden"} />
      {usersRequests && (
        <div className="flex w-full flex-col lg:px-3">
          <h2 className="text-[20px] capitalize">{`${header}(${usersRequests?.length})`}</h2>
          {usersRequests?.map((userRequest) => (
            <RequestItem
              key={userRequest.access_id}
              userRequest={userRequest}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default RequestList;
