import React from "react";
import { useGetUsersSubjectsByStatusQuery } from "../../api/endpoints/accessesEndpoints";
import Section from "../../components/UI/Section";
import RequestList from "../../components/request/RequestList";
const MyRequests = () => {
  const { data: usersRequests } = useGetUsersSubjectsByStatusQuery("pending");
  console.log(usersRequests);

  return (
    <Section>
      <RequestList usersRequests={usersRequests} />
    </Section>
  );
};

export default MyRequests;
