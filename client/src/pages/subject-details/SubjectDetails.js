import React from "react";
import { Link, useParams } from "react-router-dom";
import SubjectItemDetails from "../../components/subject_item_details/SubjectItemDetails";
import Section from "../../components/UI/Section";
import useFetchData from "../../hooks/useFetchData";
import apiConfig from "../../config/api.config";
import SubjectList from "../../components/subject/SubjectList";
const SubjectDetails = () => {
  const { subject_id } = useParams();
  const subjectDetails = useFetchData(
    apiConfig.subjectRoutes.getSubjectById(subject_id),
  );
  const userId = subjectDetails.data?.user_id;
  const category_name = subjectDetails.data?.category_name;

  const subjectsByCreator = useFetchData(
    userId
      ? apiConfig.subjectRoutes.getSubjectByCreator(userId, subject_id)
      : null,
  );
  const subjectsByCategory = useFetchData(
    category_name
      ? apiConfig.subjectRoutes.getRecommendedSubjects(
          category_name,
          subject_id,
        )
      : null,
  );

  if (
    !subjectDetails.data &&
    !subjectsByCreator.data &&
    !subjectsByCategory.data
  ) {
    return <></>;
  }

  return (
    <Section>
      <SubjectItemDetails subjectDetails={subjectDetails.data} />
      <SubjectList
        subjects={subjectsByCategory.data}
        text={"odporúčané predmety"}
      />
      {subjectsByCreator.data?.length > 0 && (
        <SubjectList
          subjects={subjectsByCreator.data}
          text={`Viac predmetov od ${subjectDetails.data?.creators_name}`}
        />
      )}
    </Section>
  );
};
export default SubjectDetails;
