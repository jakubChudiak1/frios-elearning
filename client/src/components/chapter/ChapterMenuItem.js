import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { KeyboardArrowDown } from "@mui/icons-material";

const ChapterMenuItem = ({
  chapter,
  chapters,
  subject_id,
  mainChapterIndex,
  chaptersArr,
  setChapterArr,
}) => {
  const clickHandler = (chapterId) => {
    setChapterArr((cur) => {
      const existingItemIndex = cur.findIndex(
        (item) => item.chapter === chapterId,
      );

      if (existingItemIndex !== -1) {
        const updatedArr = cur.map((item, index) => {
          if (index === existingItemIndex) {
            return { ...item, opened: !item.opened };
          }
          return item;
        });
        return updatedArr;
      } else {
        return [...cur, { chapter: chapterId, opened: !cur[0]?.opened }];
      }
    });
  };

  const isChapterOpened = (chapterId) => {
    const chapter = chaptersArr.find((item) => item.chapter === chapterId);
    return chapter ? chapter.opened : false;
  };

  return (
    <>
      {chapter?.main_chapter == null && (
        <div className="border-b-[1px] border-[lightgray] bg-gray-50 px-1 py-4 font-semibold hover:bg-gray-100">
          <Link
            to={`/${subject_id}/chapter/${chapter?.chapter_id}`}
            key={chapter.chapter_id}
            onClick={() => {
              clickHandler(chapter?.chapter_id);
            }}
          >
            <div className="flex justify-between">
              <h3 className="text-[16px] capitalize">
                {mainChapterIndex}. {chapter?.name}
              </h3>

              <div
                className={`transition-transform ${
                  isChapterOpened(chapter?.chapter_id) ? "rotate-180" : ""
                }`}
              >
                <KeyboardArrowDown />
              </div>
            </div>
          </Link>
        </div>
      )}
      {isChapterOpened(chapter?.chapter_id) &&
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
