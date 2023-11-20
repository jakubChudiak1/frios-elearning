import React from "react";
import { Link, useParams } from "react-router-dom";
import SubjectItemDetails from "../../components/subject_item_details/SubjectItemDetails";
import Section from "../../components/UI/Section";
import useFetchData from "../../hooks/useFetchData";
import apiConfig from "../../config/api.config";
import SubjectList from "../../components/subject/SubjectList";
import { useGetSubjectByIdQuery } from "../../api/endpoints/subjectsEndpoints";
import { useGetSubjectsByCreatorQuery } from "../../api/endpoints/subjectsEndpoints";
import { useGetRecommendedSubjectsQuery } from "../../api/endpoints/subjectsEndpoints";

const SubjectDetails = () => {
  const { subject_id } = useParams();

  const { data: subjectDetails } = useGetSubjectByIdQuery(subject_id);
  const userId = subjectDetails?.user_id;
  const category_name = subjectDetails?.category_name;
  console.log(category_name);
  const { data: subjectsByCreator } = useGetSubjectsByCreatorQuery(
    userId,
    subject_id,
  );
  const { data: subjectsByCategory } = useGetRecommendedSubjectsQuery(
    category_name,
    subject_id,
  );
  console.log(subjectsByCreator);
  console.log(subjectsByCategory);
  return (
    <>
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
