import React from "react";
import { useSearchParams } from "react-router-dom";
import Section from "../../components/UI/Section";
import SubjectGridList from "../../components/subject/SubjectGridList";
import { useGetSubjectsByCategoryQuery } from "../../api/endpoints/subjectsEndpoints";
import { useTranslation } from "react-i18next";

const CategorySubjects = () => {
  const [searchedParam] = useSearchParams();
  const query = searchedParam.get("q");
  const { data: subjectsByCategory } = useGetSubjectsByCategoryQuery(query);
  const { t } = useTranslation();

  return (
    <Section>
      <SubjectGridList
        subjects={subjectsByCategory}
        text={`${subjectsByCategory?.length} ${t(
          "headers.categorySubject",
        )} ${`"${query}"`}`}
      />
    </Section>
  );
};

export default CategorySubjects;
