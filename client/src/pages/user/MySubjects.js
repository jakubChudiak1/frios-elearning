import React from "react";
import Section from "../../components/UI/Section";
import SubjectGridList from "../../components/subject/SubjectGridList";
import { useGetUsersSubjectsByStatusQuery } from "../../api/endpoints/accessesEndpoints";
import { useGetEditableSubjectsQuery } from "../../api/endpoints/accessesEndpoints";
import { useTranslation } from "react-i18next";

const MySubjects = () => {
  const { data: mySubjects } = useGetUsersSubjectsByStatusQuery("accepted");
  const { data: editableSubjects } = useGetEditableSubjectsQuery();
  const { t } = useTranslation();
  return (
    <Section>
      <SubjectGridList subjects={mySubjects} text={t("headers.mySubjects")} />
    </Section>
  );
};

export default MySubjects;
