import React from "react";
import HtmlParser from "react-html-parser";
const ChapterItemDetails = ({ chapterDetails }) => {
  return (
    <div className="flex flex-col">
      <h2 className="capitalize">{chapterDetails?.name}</h2>
      <div className="flex flex-col">{HtmlParser(chapterDetails?.content)}</div>
    </div>
  );
};

export default ChapterItemDetails;
