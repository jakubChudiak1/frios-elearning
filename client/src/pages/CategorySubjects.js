import React from "react";
import { useSearchParams } from "react-router-dom";
import Section from "../components/UI/Section";
import useFetchData from "../hooks/useFetchData";
import apiConfig from "../config/api.config";
import SubjectGridList from "../components/subject/SubjectGridList";

const CategorySubjects = () => {
  const [searchedParam] = useSearchParams();
  const query = searchedParam.get("q");
  const subjectsByCategory = useFetchData(
    apiConfig.subjectRoutes.getSubjectsByCategory(query),
  );

  if (subjectsByCategory.isLoading) {
    return <div>loading</div>;
  }

  return (
    <Section>
      <SubjectGridList
        subjects={subjectsByCategory.data}
        text={`${
          subjectsByCategory.data?.length
        } predmety s kategóriou ${`"${query}"`}`}
      />
    </Section>
  );
};

export default CategorySubjects;
