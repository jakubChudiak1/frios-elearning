import React, { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import ChapterNavbar from "./ChapterNavbar";
import Footer from "../main_layout/Footer";
import ChapterSideBar from "./ChapterSideBar";
import apiConfig from "../../config/api.config";
import useFetchData from "../../hooks/useFetchData";
import GlobalLoading from "../../components/global-loading/GlobalLoading";

const ChapterLayout = () => {
  const { authenticated, user } = useAuth();
  const { subject_id } = useParams();
  const chapters = useFetchData(
    apiConfig.chapterRoutes.getSubjectChapters(subject_id),
  );
  const [sidebar, setSidebar] = useState(
    localStorage.getItem("sidebar") === "true",
  );

  const sideBarHandler = () => {
    setSidebar((prev) => !prev);
    localStorage.setItem("sidebar", !sidebar);
  };

  return (
    <div className=" flex flex-col ">
      <ChapterNavbar authenticated={authenticated} user={user} />
      <main
        className={`relative flex ${
          sidebar ? "pl-2 2xl:pl-5" : "px-2 2xl:px-5"
        }`}
      >
        <div className={`${sidebar ? "w-[80%]" : "w-full"}`}>
          <Outlet />
        </div>
        {sidebar ? (
          <ChapterSideBar
            chapters={chapters.data}
            sidebar={sidebar}
            sideBarHandler={sideBarHandler}
          />
        ) : (
          <p className="absolute right-0 top-[30%]" onClick={sideBarHandler}>
            pes
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ChapterLayout;
