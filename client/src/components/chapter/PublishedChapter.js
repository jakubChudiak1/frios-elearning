import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useUpdateChapterPublishedMutation } from "../../api/endpoints/chaptersEndpoints";

const PublishedChapter = ({ chapter_id, published }) => {
  const [updateChapterPublished] = useUpdateChapterPublishedMutation();
  const publishedChapterHandler = async (isPublished) => {
    await updateChapterPublished({
      chapterId: chapter_id,
      published: isPublished,
    });
  };
  return (
    <>
      {published ? (
        <VisibilityIcon
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            publishedChapterHandler(false);
          }}
        />
      ) : (
        <VisibilityOffIcon
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            publishedChapterHandler(true);
          }}
        />
      )}
    </>
  );
};

export default PublishedChapter;
