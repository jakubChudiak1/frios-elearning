import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../../context/authContext";
import useActiveMenu from "../../hooks/useActiveMenu";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import GlobalLoading from "../../components/global-loading/GlobalLoading";
import MobileNavbar from "./MobileNavbar";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

const MainLayout = () => {
  const { user, authenticated, loading } = useAuth();
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const activeMenu = useActiveMenu(user, authenticated, loading);
  const isMobile = useMediaQuery({ query: "(max-width:1023.9px)" });

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  if (loading) {
    return <></>;
  }

  return (
    <>
      <div className="container relative flex w-full flex-col px-2 sm:mx-auto  2xl:px-5 ">
        <div className="flex ">
          <Sidebar activeMenu={activeMenu} />
          <main className="relative flex w-full flex-col gap-0 sm:gap-2  lg:w-[calc(100%-160px)] lg:pl-1">
            {!isMobile ? (
              <Navbar authenticated={authenticated} user={user} />
            ) : (
              <MobileNavbar
                authenticated={authenticated}
                activeMenu={activeMenu}
                user={user}
              />
            )}
            <GlobalLoading />
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
