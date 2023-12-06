import React from "react";
import { Link, useParams } from "react-router-dom";
import SubjectItemDetails from "../../components/subject_item_details/SubjectItemDetails";
import Section from "../../components/UI/Section";
import SubjectList from "../../components/subject/SubjectList";
import { useGetSubjectByIdQuery } from "../../api/endpoints/subjectsEndpoints";
import { useGetSubjectsByCreatorQuery } from "../../api/endpoints/subjectsEndpoints";
import { useGetRecommendedSubjectsQuery } from "../../api/endpoints/subjectsEndpoints";
import { ToastContainer } from "react-toastify";

const SubjectDetails = () => {
  const { subject_id } = useParams();
  const { data: subjectDetails } = useGetSubjectByIdQuery(subject_id);
  const { data: subjectsByCreator } = useGetSubjectsByCreatorQuery({
    userId: subjectDetails?.user_id,
    subjectId: subject_id,
  });
  const { data: subjectsByCategory } = useGetRecommendedSubjectsQuery({
    categoryName: subjectDetails?.category_name,
    subjectId: subject_id,
  });

  return (
    <>
      <ToastContainer />
      <Section>
        <SubjectItemDetails subjectDetails={subjectDetails} />
        <SubjectList
          subjects={subjectsByCategory}
          text={"odporúčané predmety"}
        />
        {subjectsByCreator?.length > 0 && (
          <SubjectList
            subjects={subjectsByCreator}
            text={`Viac predmetov od ${subjectDetails?.creators_name}`}
          />
        )}
      </Section>
    </>
  );
};
export default SubjectDetails;
