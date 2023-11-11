import React from "react";
import Section from "../../components/UI/Section";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiConfig from "../../config/api.config";
import useFetchData from "../../hooks/useFetchData";
import LessonItemDetails from "../../components/chapter/ChapterItemDetails";

const Chapter = () => {
  const { subject_id, chapter_id } = useParams();
  const navigate = useNavigate();
  const chapterDetails = useFetchData(
    apiConfig.chapterRoutes.getChaptersContent(subject_id, chapter_id),
  );

  return (
    <Section>
      <LessonItemDetails chapterDetails={chapterDetails.data} />
    </Section>
  );
};

export default Chapter;
