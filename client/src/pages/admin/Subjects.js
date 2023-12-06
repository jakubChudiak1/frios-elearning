import React from "react";
import Section from "../../components/UI/Section";
import SubjectGridList from "../../components/subject/SubjectGridList";
import { useGetSubjectsListQuery } from "../../api/endpoints/subjectsEndpoints";
const Subjects = () => {
  const { data: subjects } = useGetSubjectsListQuery();

  return (
    <Section>
      <SubjectGridList subjects={subjects} text={"Všetky Predmety"} />
    </Section>
  );
};

export default Subjects;
