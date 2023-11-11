import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ChapterMenuItem from "../../components/chapter/ChapterMenuItem";
import { Close } from "@mui/icons-material";

const ChapterSideBar = ({ chapters }) => {
  const { subject_id } = useParams();
  const [closeMenu, setCloseMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  let mainChapterIndex = 0;

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

  const sidebarStyles = {
    top: scrolled ? "0" : "80px",
    height: scrolled ? "100%" : "calc(100% - 80px)",
    transition: "top 0.1s ease-in-out",
  };

  return (
    <aside
      className=" fixed right-0 top-[80px]  z-[1]  w-[20%] border-l-[1px] border-gray-100"
      style={sidebarStyles}
    >
      <div className="relative flex h-full flex-col overflow-y-auto">
        <div className=" flex items-center justify-between bg-gray-200 px-1 py-4">
          <h3 className="text-[20px] capitalize">obsah</h3>
          <Close className="cursor-pointer" />
        </div>
        <div className="z-[1] overflow-y-auto overflow-x-hidden">
          {chapters?.map((chapter) => {
            if (chapter?.main_chapter === null) {
              mainChapterIndex++;
            }
            return (
              <ChapterMenuItem
                key={chapter.chapter_id}
                chapter={chapter}
                chapters={chapters}
                subject_id={subject_id}
                mainChapterIndex={mainChapterIndex}
              />
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default ChapterSideBar;
