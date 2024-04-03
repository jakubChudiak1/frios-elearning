import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import ChapterNavbar from "./ChapterNavbar";
import Footer from "../main_layout/Footer";
import ChapterSideBar from "./ChapterSideBar";
import { useGetSubjectChaptersQuery } from "../../api/endpoints/chaptersEndpoints";
import { useSelector } from "react-redux";
import { useGetIsSubjectEditableQuery } from "../../api/endpoints/accessesEndpoints";
import { useTranslation } from "react-i18next";
import OpenChapterMenu from "../../components/chapter/OpenChapterMenu";
import { useMediaQuery } from "react-responsive";

const ChapterLayout = () => {
  const { editModeState } = useSelector((state) => state.editModeState);
  const { authenticated, user, loading } = useAuth();
  const { subject_id } = useParams();
  const { lang } = useParams();
  const isMobile = useMediaQuery({ query: "(max-width:540px)" });
  const { i18n } = useTranslation();
  const { data: chapters } = useGetSubjectChaptersQuery({
    subjectId: subject_id,
    published: editModeState ? false : true,
  });
  const [sidebar, setSidebar] = useState(isMobile ? false : true);

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  const sideBarHandler = () => {
    setSidebar((prev) => !prev);
  };

  const { data: isEditable } = useGetIsSubjectEditableQuery(subject_id, {
    skip: !editModeState,
  });

  if (loading) {
    return <></>;
  }
  return (
    <div className=" flex flex-col px-2 2xl:px-5">
      <ChapterNavbar authenticated={authenticated} user={user} />
      <main
        className={`relative flex  ${
          sidebar ? "w-0 sm:w-[calc(100%-300px)]" : "w-full"
        }`}
      >
        <Outlet context={{ sidebar: sidebar }} />
      </main>
      {sidebar ? (
        <ChapterSideBar
          chapters={chapters}
          sidebar={sidebar}
          isEditable={isEditable}
          sideBarHandler={sideBarHandler}
        />
      ) : (
        <OpenChapterMenu sideBarHandler={sideBarHandler} />
      )}
      <Footer />
    </div>
  );
};

export default ChapterLayout;
