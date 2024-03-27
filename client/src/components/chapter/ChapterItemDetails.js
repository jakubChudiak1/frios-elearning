import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import HtmlParser from "html-react-parser";
import ArrowBack from "../UI/ArrowBack";
import Editor from "../editor/Editor";
import { useSelector } from "react-redux";
import { useGetIsSubjectEditableQuery } from "../../api/endpoints/accessesEndpoints";
import { useUpdateChaptersContentMutation } from "../../api/endpoints/chaptersEndpoints";
import UpdateChaptersName from "./UpdateChaptersName";

const ChapterItemDetails = ({ chapterDetails }) => {
  const { subject_id, chapter_id, lang } = useParams();

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
      <ArrowBack link={`/${lang}/subject/${subject_id}`} showed={"block"} />
      {editModeState && isEditable ? (
        <UpdateChaptersName chapter={chapterDetails} />
      ) : (
        <h2 className="break-all capitalize">{chapterDetails?.name}</h2>
      )}
      {editModeState && isEditable ? (
        <Editor
          data={chapterDetails?.content}
          isHandler={true}
          dataHandler={updateChaptersContentHandler}
        />
      ) : (
        <div className="chapter-content mr-5 pt-2">
          {HtmlParser(chapterDetails?.content ? chapterDetails?.content : "")}
        </div>
      )}
    </div>
  );
};

export default ChapterItemDetails;
