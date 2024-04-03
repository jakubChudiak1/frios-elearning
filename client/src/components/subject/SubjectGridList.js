import React from "react";
import SubjectItem from "./SubjectItem";
import Grid from "../UI/Grid";
import ArrowBack from "../UI/ArrowBack";
import { useParams } from "react-router-dom";

const SubjectGridList = ({ subjects, text }) => {
  const { lang } = useParams();
  return (
    <>
      <ArrowBack link={`/${lang}`} showed={"hidden"} />
      {subjects && (
        <Grid text={text}>
          {subjects?.map((subject) => (
            <SubjectItem key={subject.subject_id} subject={subject} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default SubjectGridList;
