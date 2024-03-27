import React from "react";
import Section from "../../components/UI/Section";
import SubjectGridList from "../../components/subject/SubjectGridList";
import { useGetSubjectsListQuery } from "../../api/endpoints/subjectsEndpoints";
import { useTranslation } from "react-i18next";

const Subjects = () => {
  const { data: subjects } = useGetSubjectsListQuery();
  const { t } = useTranslation();
  return (
    <Section>
      <SubjectGridList subjects={subjects} text={t("headers.allSubjects")} />
    </Section>
  );
};

export default Subjects;
