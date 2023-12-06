import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { KeyboardArrowDown } from "@mui/icons-material";

const ChapterMenuItem = ({
  chapter,
  chapters,
  subject_id,
  depth,
  index,
  parentIndex,
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <div
        className={`border-b-[1px] border-[lightgray] ${
          chapter?.main_chapter == null ? "bg-gray-50" : "bg-white"
        } ${`px-${depth}`} py-4 font-semibold hover:bg-gray-100`}
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
                chapter?.main_chapter == null ? "text-[16px]" : " text-[14px]"
              } capitalize`}
            >
              <span>{parentIndex}</span>
              <span>
                {`${index ? `.${index}` : ""}`} {`${chapter?.name}`}
              </span>
            </h3>
            <div
              className={`transition-transform ${opened ? "rotate-180" : ""}`}
            >
              {chapter?.sideChapters && chapter?.sideChapters?.length > 0 && (
                <KeyboardArrowDown />
              )}
            </div>
          </div>
        </Link>
      </div>
      {opened && (
        <div>
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
        </div>
      )}
    </>
  );
};

export default ChapterMenuItem;
