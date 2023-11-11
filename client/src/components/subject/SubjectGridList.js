import React from "react";
import SubjectItem from "./SubjectItem";
import Grid from "../UI/Grid";

const SubjectGridList = ({ subjects, text }) => {
  return (
    <Grid text={text}>
      {subjects?.map((subject) => (
        <SubjectItem key={subject.subject_id} subject={subject} />
      ))}
    </Grid>
  );
};

export default SubjectGridList;
