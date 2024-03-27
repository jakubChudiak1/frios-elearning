import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ChapterMenuItem from "../../components/chapter/ChapterMenuItem";
import { Close } from "@mui/icons-material";
import AddChapter from "../../components/chapter/AddChapter";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ChapterSideBar = ({ chapters, sideBarHandler, isEditable }) => {
  const { editModeState } = useSelector((state) => state.editModeState);
  const { subject_id } = useParams();
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  let mainChapterIndex = 0;
  const sidebarStyles = {
    top: scrolled ? "0" : "80px",
    height: scrolled ? "100%" : "calc(100% - 80px)",
    transition: "top 0.1s ease-in-out",
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <aside
        className=" fixed right-0 top-[80px]  z-[5000] w-full  border-l-[1px] border-gray-100 xs:w-[300px]"
        style={sidebarStyles}
      >
        <div className="relative flex h-full flex-col overflow-y-auto">
          <div className=" flex items-center justify-between bg-gray-200 px-1 py-4">
            <h3 className="text-[18px] capitalize">
              {t("chapters.chapterContent")}
            </h3>
            <Close className="cursor-pointer" onClick={sideBarHandler} />
          </div>
          <div className="z-[1] overflow-y-auto overflow-x-hidden">
            {chapters?.map((chapter) => {
              mainChapterIndex++;
              return (
                <ChapterMenuItem
                  key={chapter.chapter_id}
                  chapter={chapter}
                  chapters={chapters}
                  isEditable={isEditable}
                  subject_id={subject_id}
                  depth={1}
                  parentIndex={mainChapterIndex}
                  index={0}
                />
              );
            })}
            {editModeState && isEditable && <AddChapter />}
          </div>
        </div>
      </aside>
    </>
  );
};

export default ChapterSideBar;
