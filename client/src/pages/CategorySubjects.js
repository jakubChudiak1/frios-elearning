import React from "react";
import { useSearchParams } from "react-router-dom";
import Section from "../components/UI/Section";
import useFetchData from "../hooks/useFetchData";
import apiConfig from "../config/api.config";
import SubjectGridList from "../components/subject/SubjectGridList";
import { useGetSubjectsByCategoryQuery } from "../api/endpoints/subjectsEndpoints";

const CategorySubjects = () => {
  const [searchedParam] = useSearchParams();
  const query = searchedParam.get("q");
  const { data: subjectsByCategory } = useGetSubjectsByCategoryQuery(query);
  return (
    <Section>
      <SubjectGridList
        subjects={subjectsByCategory}
        text={`${
          subjectsByCategory?.length
        } predmety s kategóriou ${`"${query}"`}`}
      />
    </Section>
  );
};

export default CategorySubjects;
