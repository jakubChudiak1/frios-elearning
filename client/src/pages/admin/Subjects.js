import React from "react";
import Section from "../../components/UI/Section";
import apiConfig from "../../config/api.config";
import useFetchData from "../../hooks/useFetchData";
import SubjectGridList from "../../components/subject/SubjectGridList";

const Subjects = () => {
  const subjectsList = useFetchData(apiConfig.subjectRoutes.getSubjectsList);

  return (
    <Section>
      <SubjectGridList subjects={subjectsList.data} text={"Všetky Predmety"} />
    </Section>
  );
};

export default Subjects;
