import React from "react";
import { useSearchParams } from "react-router-dom";
import Section from "../../components/UI/Section";
import SubjectGridList from "../../components/subject/SubjectGridList";
import { useGetSubjectByStringQuery } from "../../api/endpoints/subjectsEndpoints";
const SearchedSubjects = () => {
  const [searchedParam] = useSearchParams();
  const query = searchedParam.get("q");

  const { data: searchedSubjects } = useGetSubjectByStringQuery(query);

  return (
    <Section>
      <SubjectGridList
        subjects={searchedSubjects}
        text={`${searchedSubjects?.length} výsledkov pre ${`"${query}"`}`}
      />
    </Section>
  );
};

export default SearchedSubjects;
