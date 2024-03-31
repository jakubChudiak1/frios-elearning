import React from "react";
import Section from "../../components/UI/Section";
import { useParams, useOutletContext } from "react-router-dom";
import ChapterItemDetails from "../../components/chapter/ChapterItemDetails";
import { useGetChaptersContentQuery } from "../../api/endpoints/chaptersEndpoints";
import { useSidebar } from "../../layout/chapter_layout/ChapterLayout";
import { useMediaQuery } from "react-responsive";

const Chapter = () => {
  const { subject_id, chapter_id } = useParams();
  const { data: chapterDetails } = useGetChaptersContentQuery({
    subjectId: subject_id,
    chapterId: chapter_id,
  });
  const { sidebar } = useOutletContext();
  const isMobile = useMediaQuery({ query: "(max-width:640px)" });
  console.log("sidebar", sidebar);
  console.log(isMobile);
  return (
    <Section>
      {sidebar && isMobile ? null : (
        <ChapterItemDetails chapterDetails={chapterDetails} />
      )}
    </Section>
  );
};

export default Chapter;
