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

const ChapterLayout = () => {
  const { editModeState } = useSelector((state) => state.editModeState);
  const { authenticated, user, loading } = useAuth();
  const { subject_id } = useParams();
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const { data: chapters } = useGetSubjectChaptersQuery(subject_id);
  const [sidebar, setSidebar] = useState(true);
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
    <div className=" flex flex-col ">
      <ChapterNavbar authenticated={authenticated} user={user} />
      <main
        className={`relative flex ${sidebar ? "pl-2 " : "px-2 2xl:px-5"} ${
          sidebar ? "w-[calc(100%-300px)]" : "w-full"
        }`}
      >
        <Outlet />
      </main>
      {
        sidebar ? (
          <ChapterSideBar
            chapters={chapters}
            sidebar={sidebar}
            isEditable={isEditable}
            sideBarHandler={sideBarHandler}
          />
        ) : null /*  (
        <motion.div
          className="absolute right-5 top-[13%] z-[1000] flex cursor-pointer items-center text-[#a855f7]"
          onClick={sideBarHandler}
          whileHover={{
            x: 5,
          }}
        >
          <p className="hidden md:block">Otvoriť</p>
          <ArrowForwardIos fontSize="large" />
        </motion.div>
      ) */
      }
      <Footer />
    </div>
  );
};

export default ChapterLayout;
