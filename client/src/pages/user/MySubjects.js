import React from "react";
import Section from "../../components/UI/Section";
import SubjectGridList from "../../components/subject/SubjectGridList";
import { useGetUsersSubjectsByStatusQuery } from "../../api/endpoints/accessesEndpoints";
import { useGetEditableSubjectsQuery } from "../../api/endpoints/accessesEndpoints";

const MySubjects = () => {
  const { data: mySubjects } = useGetUsersSubjectsByStatusQuery("accepted");
  const { data: editableSubjects } = useGetEditableSubjectsQuery();
  console.log(editableSubjects);
  return (
    <Section>
      <SubjectGridList subjects={mySubjects} text={"Moje Predmety"} />
    </Section>
  );
};

export default MySubjects;
