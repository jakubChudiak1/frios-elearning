import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteChapterMutation } from "../../api/endpoints/chaptersEndpoints";
import { useParams } from "react-router-dom";
import PublishedChapter from "./PublishedChapter";

const ChapterEditIcons = ({ chapterId, published }) => {
  const { subject_id } = useParams();
  const [deleteChapter] = useDeleteChapterMutation();
  const deleteChapterHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await deleteChapter({ subject_id: subject_id, chapter_id: chapterId });
  };

  return (
    <div className="flex items-center">
      <PublishedChapter published={published} chapter_id={chapterId} />
      <DeleteIcon
        onClick={deleteChapterHandler}
        fontSize="small"
        className="cursor-pointer text-red-500"
      />
    </div>
  );
};

export default ChapterEditIcons;
