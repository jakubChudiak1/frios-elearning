import React from "react";
import { Link, useParams } from "react-router-dom";
import HtmlParser from "react-html-parser";
import ArrowBack from "../UI/ArrowBack";
import Editor from "../editor/Editor";
const ChapterItemDetails = ({ chapterDetails }) => {
  const { subject_id } = useParams();
  console.log(chapterDetails?.content);
  return (
    <div className="flex flex-col">
      <ArrowBack link={`/subject/${subject_id}`} />
      <h2 className="capitalize">{chapterDetails?.name}</h2>

      <Editor data={chapterDetails?.content} />

      <div className="chapter-content mr-5 pt-2">
        {HtmlParser(chapterDetails?.content)}
      </div>
    </div>
  );
};

export default ChapterItemDetails;
