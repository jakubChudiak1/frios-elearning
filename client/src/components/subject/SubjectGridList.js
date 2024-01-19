import React from "react";
import SubjectItem from "./SubjectItem";
import Grid from "../UI/Grid";
import ArrowBack from "../UI/ArrowBack";

const SubjectGridList = ({ subjects, text }) => {
  return (
    <>
      <ArrowBack link={"/"} />
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
