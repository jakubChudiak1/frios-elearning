import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import ChapterNavbar from "./ChapterNavbar";
import Footer from "../main_layout/Footer";
import ChapterSideBar from "./ChapterSideBar";
import { useGetSubjectChaptersQuery } from "../../api/endpoints/chaptersEndpoints";
import { ArrowForwardIos } from "@mui/icons-material";
import { motion } from "framer-motion";

const ChapterLayout = () => {
  const { authenticated, user, loading } = useAuth();
  const { subject_id } = useParams();
  const { data: chapters } = useGetSubjectChaptersQuery(subject_id);
  const [sidebar, setSidebar] = useState(
    localStorage.getItem("sidebar") === "true",
  );
  const sideBarHandler = () => {
    setSidebar((prev) => !prev);
    localStorage.setItem("sidebar", !sidebar);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 1024) {
        localStorage.setItem("sidebar", setSidebar(false));
        localStorage.setItem("sidebar", false);
      } else {
        localStorage.setItem("sidebar", setSidebar(true));
        localStorage.setItem("sidebar", true);
      }
    });
  }, []);

  if (loading) {
    return <></>;
  }
  console.log(sidebar);
  return (
    <div className=" flex flex-col ">
      <ChapterNavbar authenticated={authenticated} user={user} />
      <main
        className={`relative flex ${
          sidebar ? "pl-2 2xl:pl-5" : "px-2 2xl:px-5"
        } ${sidebar ? "w-[calc(100%-300px)]" : "w-full"}`}
      >
        <Outlet />
      </main>
      {sidebar ? (
        <ChapterSideBar
          chapters={chapters}
          sidebar={sidebar}
          sideBarHandler={sideBarHandler}
        />
      ) : (
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
      )}
      <Footer />
    </div>
  );
};

export default ChapterLayout;
