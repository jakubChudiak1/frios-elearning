import React from "react";
import Section from "../../components/UI/Section";
import SubjectGridList from "../../components/subject/SubjectGridList";
import apiConfig from "../../config/api.config";
import useFetchData from "../../hooks/useFetchData";

const MySubjects = () => {
  const mySubjects = useFetchData(apiConfig.userRoutes.getUsersSubjects);

  return (
    <Section>
      <SubjectGridList subjects={mySubjects.data} text={"Moje Predmety"} />
    </Section>
  );
};

export default MySubjects;
