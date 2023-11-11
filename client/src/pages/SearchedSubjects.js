import React from "react";
import { useSearchParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import apiConfig from "../config/api.config";
import Section from "../components/UI/Section";
import SubjectGridList from "../components/subject/SubjectGridList";
const SearchedSubjects = () => {
  const [searchedParam] = useSearchParams();
  const query = searchedParam.get("q");

  const searchedSubjects = useFetchData(
    apiConfig.subjectRoutes.getSubjectsByString(query),
  );

  return (
    <Section>
      <SubjectGridList
        subjects={searchedSubjects.data}
        text={`${searchedSubjects.data?.length} výsledkov pre ${`"${query}"`}`}
      />
    </Section>
  );
};

export default SearchedSubjects;
