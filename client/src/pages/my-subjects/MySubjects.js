import React from "react";
import Section from "../../components/UI/Section";
import SubjectGridList from "../../components/subject/SubjectGridList";
import { useGetUsersSubjectsQuery } from "../../api/endpoints/usersEndpoints";

const MySubjects = () => {
  const mySubjects = useGetUsersSubjectsQuery();

  return (
    <Section>
      <SubjectGridList subjects={mySubjects.data} text={"Moje Predmety"} />
    </Section>
  );
};

export default MySubjects;
