import React from "react";
import { Link, useParams } from "react-router-dom";
import SubjectItemDetails from "../../components/subject_item_details/SubjectItemDetails";
import Section from "../../components/UI/Section";
import SubjectList from "../../components/subject/SubjectList";
import { useGetSubjectByIdQuery } from "../../api/endpoints/subjectsEndpoints";
import { useGetSubjectsByCreatorQuery } from "../../api/endpoints/subjectsEndpoints";
import { useGetRecommendedSubjectsQuery } from "../../api/endpoints/subjectsEndpoints";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

const SubjectDetails = () => {
  const { subject_id } = useParams();
  const { data: subjectDetails } = useGetSubjectByIdQuery(subject_id);
  const { data: subjectsByCreator } = useGetSubjectsByCreatorQuery(
    {
      userId: subjectDetails?.user_id,
      subjectId: subject_id,
    },
    { skip: subjectDetails?.user_id === undefined },
  );
  const { data: subjectsByCategory } = useGetRecommendedSubjectsQuery(
    {
      categoryName: subjectDetails?.category_name,
      subjectId: subject_id,
    },
    { skip: subjectDetails?.user_id === undefined },
  );
  const { t } = useTranslation();

  return (
    <>
      <ToastContainer />
      <Section>
        <SubjectItemDetails subjectDetails={subjectDetails} />
        {subjectsByCategory?.length > 0 && (
          <SubjectList
            subjects={subjectsByCategory}
            text={t("headers.recommendedSubjects")}
          />
        )}
        {subjectsByCreator?.length > 0 && (
          <SubjectList
            subjects={subjectsByCreator}
            text={`${t("headers.moreSubjectsFrom")} ${
              subjectDetails?.creators_name
            }`}
          />
        )}
      </Section>
    </>
  );
};
export default SubjectDetails;
