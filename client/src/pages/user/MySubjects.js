import React from "react";
import Section from "../../components/UI/Section";
import SubjectGridList from "../../components/subject/SubjectGridList";
import { useGetUsersSubjectsByStatusQuery } from "../../api/endpoints/accessesEndpoints";

const MySubjects = () => {
  const { data: mySubjects } = useGetUsersSubjectsByStatusQuery("accepted");

  return (
    <Section>
      <SubjectGridList subjects={mySubjects} text={"Moje Predmety"} />
    </Section>
  );
};

export default MySubjects;
