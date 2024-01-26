import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useSelector } from "react-redux";
import AddSideChapter from "./AddSideChapter";

const ChapterMenuItem = ({
  chapter,
  chapters,
  subject_id,
  depth,
  index,
  parentIndex,
}) => {
  const { editModeState } = useSelector((state) => state.editModeState);
  const [opened, setOpened] = useState(false);

  return (
    <>
      <div
        className={`border-b-[1px] border-[lightgray] pr-2 ${
          chapter?.main_chapter == null ? "bg-gray-50" : "bg-white"
        } py-4 pl-[10px] font-semibold hover:bg-gray-100`}
      >
        <Link
          to={`/${subject_id}/chapter/${chapter?.chapter_id}`}
          key={chapter.chapter_id}
          onClick={() => {
            setOpened((prev) => !prev);
          }}
        >
          <div className="flex justify-between gap-1">
            <h3
              className={`${
                chapter?.main_chapter == null ? "text-[14px]" : " text-[12px]"
              } flex gap-1 capitalize `}
            >
              <span>
                {parentIndex}.{`${index ? `${index}` : ""}`}
              </span>
              <span>{`${chapter?.name}`}</span>
            </h3>
            <div
              className={`self-baseline transition-transform ${
                opened ? "rotate-180" : ""
              }`}
            >
              {((chapter?.sideChapters && chapter?.sideChapters?.length > 0) ||
                editModeState) && <KeyboardArrowDown />}
            </div>
          </div>
        </Link>
      </div>
      {opened && (
        <div>
          {console.log(chapter?.main_chapter)}
          {chapter?.sideChapters?.map((subChapter, subIndex) => (
            <ChapterMenuItem
              key={subChapter?.chapter_id}
              chapter={subChapter}
              chapters={chapters}
              subject_id={subject_id}
              depth={depth + 1}
              index={subIndex + 1}
              parentIndex={`${parentIndex}${index ? `.${index}` : ""}`}
            />
          ))}
          {editModeState && (
            <AddSideChapter mainChapter={chapter?.chapter_id} />
          )}
        </div>
      )}
    </>
  );
};

export default ChapterMenuItem;
