import React from "react";
import Section from "../../components/UI/Section";
import { Link, useNavigate, useParams } from "react-router-dom";
import ChapterItemDetails from "../../components/chapter/ChapterItemDetails";
import { useGetChaptersContentQuery } from "../../api/endpoints/chaptersEndpoints";

const Chapter = () => {
  const { subject_id, chapter_id } = useParams();
  const { data: chapterDetails } = useGetChaptersContentQuery({
    subjectId: subject_id,
    chapterId: chapter_id,
  });

  return (
    <Section>
      <ChapterItemDetails chapterDetails={chapterDetails} />
    </Section>
  );
};

export default Chapter;
