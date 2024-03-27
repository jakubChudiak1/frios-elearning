import React from "react";
import { useGetUsersSubjectsByStatusQuery } from "../../api/endpoints/accessesEndpoints";
import Section from "../../components/UI/Section";
import RequestList from "../../components/request/RequestList";
import { useTranslation } from "react-i18next";

const MyRequests = () => {
  const { data: usersRequests } = useGetUsersSubjectsByStatusQuery("pending");
  const { t } = useTranslation();
  return (
    <Section>
      <RequestList
        usersRequests={usersRequests}
        header={t("headers.myRequests")}
      />
    </Section>
  );
};

export default MyRequests;
