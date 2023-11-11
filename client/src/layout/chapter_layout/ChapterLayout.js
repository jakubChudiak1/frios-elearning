import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import ChapterNavbar from "./ChapterNavbar";
import Footer from "../Footer";
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

  return (
    <div className=" flex flex-col ">
      <ChapterNavbar authenticated={authenticated} user={user} />
      <main className="flex pl-2 2xl:pl-5">
        <div className="w-[80%]">
          <Outlet />
        </div>
        <ChapterSideBar chapters={chapters.data} />
      </main>
      <Footer />
    </div>
  );
};

export default ChapterLayout;
