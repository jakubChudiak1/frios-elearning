import React, { useState } from "react";
import { Link } from "react-router-dom";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const ChapterMenuItem = ({
  chapter,
  chapters,
  subject_id,
  mainChapterIndex,
}) => {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      {chapter?.main_chapter === null && (
        <div className="border-b-[1px] border-[lightgray] bg-gray-50 px-1 py-4 font-semibold hover:bg-gray-100">
          <Link
            to={`/${subject_id}/chapter/${chapter?.chapter_id}`}
            key={chapter.chapter_id}
            onClick={() => {
              setClicked((prev) => !prev);
            }}
          >
            <div className="flex justify-between">
              <h3 className="text-[16px] capitalize">
                {mainChapterIndex}. {chapter?.name}
              </h3>

              <div
                className={`transition-transform ${
                  clicked ? "rotate-180" : ""
                }`}
              >
                <KeyboardArrowDown />
              </div>
            </div>
          </Link>
        </div>
      )}
      {clicked &&
        chapters
          .filter((item) => item.main_chapter === chapter.chapter_id)
          .map((chapterItem, index) => (
            <Link
              key={chapterItem.chapter_id}
              to={`/${subject_id}/chapter/${chapterItem?.chapter_id}`}
              className="flex py-3 hover:bg-gray-100"
            >
              <div className="flex gap-1 pl-2">
                {mainChapterIndex}.{index + 1}.
                <span className="capitalize">{chapterItem.name}</span>
              </div>
            </Link>
          ))}
    </>
  );
};

export default ChapterMenuItem;
