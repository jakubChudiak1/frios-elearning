import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteChapterMutation } from "../../api/endpoints/chaptersEndpoints";
import { useParams } from "react-router-dom";

const ChapterEditIcons = ({ chapterId }) => {
  const { subject_id } = useParams();
  console.log(subject_id);
  const [deleteChapter] = useDeleteChapterMutation();
  const deleteChapterHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await deleteChapter({ subject_id: subject_id, chapter_id: chapterId });
  };

  return (
    <div className="flex flex-col">
      <DeleteIcon
        onClick={deleteChapterHandler}
        fontSize="small"
        className="cursor-pointer text-red-500"
      />
    </div>
  );
};

export default ChapterEditIcons;
