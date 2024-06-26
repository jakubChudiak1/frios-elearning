import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useSelector } from "react-redux";
import AddSideChapter from "./AddSideChapter";
import ChapterEditIcons from "./ChapterEditIcons";

const ChapterMenuItem = ({
  chapter,
  chapters,
  isEditable,
  subject_id,
  depth,
  index,
  parentIndex,
}) => {
  const { editModeState } = useSelector((state) => state.editModeState);
  const [opened, setOpened] = useState(false);
  const { lang } = useParams();
  return (
    <>
      <div
        className={`border-b-[1px] border-[lightgray] pr-2 ${
          chapter?.main_chapter == null ? "bg-gray-50" : "bg-white"
        } py-4 pl-[10px] font-semibold hover:bg-gray-100`}
      >
        <Link
          to={`/${lang}/${subject_id}/chapter/${chapter?.chapter_id}`}
          key={chapter.chapter_id}
          onClick={() => {
            setOpened((prev) => !prev);
          }}
        >
          <div
            className={`${
              chapter?.main_chapter == null ? "pl-0" : "pl-1"
            } flex justify-between gap-1`}
          >
            <div className="flex gap-1">
              {editModeState && isEditable && (
                <ChapterEditIcons
                  chapterId={chapter?.chapter_id}
                  published={chapter?.published}
                />
              )}
              <h3
                className={`${
                  chapter?.main_chapter == null ? "text-[16px]" : " text-[14px]"
                } flex gap-1 capitalize `}
              >
                <span>
                  {parentIndex}.{`${index ? `${index}` : ""}`}
                </span>
                <span className="break-all">{`${chapter?.name}`}</span>
              </h3>
            </div>
            <div
              className={`self-baseline transition-transform ${
                opened ? "rotate-180" : ""
              }`}
            >
              {((chapter?.sideChapters && chapter?.sideChapters?.length > 0) ||
                (editModeState && isEditable)) && <KeyboardArrowDown />}
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
              isEditable={isEditable}
              subject_id={subject_id}
              depth={depth + 1}
              index={subIndex + 1}
              parentIndex={`${parentIndex}${index ? `.${index}` : ""}`}
            />
          ))}
          {editModeState && isEditable && (
            <AddSideChapter mainChapter={chapter?.chapter_id} />
          )}
        </div>
      )}
    </>
  );
};

export default ChapterMenuItem;
