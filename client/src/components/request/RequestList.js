import React from "react";
import RequestItem from "./RequestItem";
import ArrowBack from "../UI/ArrowBack";
import { useParams } from "react-router-dom";
const RequestList = ({ usersRequests, header }) => {
  const { lang } = useParams();
  return (
    <>
      <ArrowBack link={`/${lang}`} showed={"hidden"} />
      {usersRequests && (
        <div className="mt-1 flex w-full flex-col">
          <h2 className=" capitalize">{`${header}(${usersRequests?.length})`}</h2>
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
