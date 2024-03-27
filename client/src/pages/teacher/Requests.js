import React from "react";
import Section from "../../components/UI/Section";
import { useGetUsersRequestsQuery } from "../../api/endpoints/accessesEndpoints";
import RequestList from "../../components/request/RequestList";
import { useTranslation } from "react-i18next";

const Requests = () => {
  const { data: usersRequests } = useGetUsersRequestsQuery();
  const { t } = useTranslation();
  return (
    <Section>
      <RequestList
        usersRequests={usersRequests}
        header={t("headers.requests")}
      />
    </Section>
  );
};

export default Requests;
