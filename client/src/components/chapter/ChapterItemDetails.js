import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import HtmlParser from "react-html-parser";
import ArrowBack from "../UI/ArrowBack";
import Editor from "../editor/Editor";
import { useSelector } from "react-redux";
import { useGetIsSubjectEditableQuery } from "../../api/endpoints/accessesEndpoints";
import { useUpdateChaptersContentMutation } from "../../api/endpoints/chaptersEndpoints";

const ChapterItemDetails = ({ chapterDetails }) => {
  const { subject_id, chapter_id } = useParams();

  const { editModeState } = useSelector((state) => state.editModeState);
  const { data: isEditable } = useGetIsSubjectEditableQuery(subject_id, {
    skip: !editModeState,
  });
  const [updateChaptersContent] = useUpdateChaptersContentMutation();
  const updateChaptersContentHandler = async (data) => {
    await updateChaptersContent({
      chapterId: chapter_id,
      subject_id: subject_id,
      content: data,
    });
  };

  return (
    <div className="flex flex-col">
      <ArrowBack link={`/subject/${subject_id}`} showed={"block"} />
      <h2 className="break-all capitalize">{chapterDetails?.name}</h2>
      {editModeState && isEditable ? (
        <Editor
          data={chapterDetails?.content}
          dataHandler={updateChaptersContentHandler}
        />
      ) : (
        <div className="chapter-content mr-5 pt-2">
          {HtmlParser(chapterDetails?.content)}
        </div>
      )}
    </div>
  );
};

export default ChapterItemDetails;
