import React from "react";
import Section from "../../components/UI/Section";
import { useGetUsersRequestsQuery } from "../../api/endpoints/accessesEndpoints";
import RequestList from "../../components/request/RequestList";
const Requests = () => {
  const { data: usersRequests } = useGetUsersRequestsQuery();
  console.log(usersRequests);
  return (
    <Section>
      <RequestList usersRequests={usersRequests} header={"žiadosti"} />
    </Section>
  );
};

export default Requests;
