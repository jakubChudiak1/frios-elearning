import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../context/authContext";
import useActiveMenu from "../hooks/useActiveMenu";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import GlobalLoading from "../components/global-loading/GlobalLoading";

const MainLayout = () => {
  const { user, authenticated, loading } = useAuth();
  const activeMenu = useActiveMenu(user, authenticated);
  const [toggled, setToggled] = useState(false);
  const menuHandler = () => {
    setToggled((prev) => !prev);
  };

  if (loading) {
    return <GlobalLoading />;
  }

  return (
    <>
      <div className="container flex w-full flex-col px-2 sm:mx-auto  2xl:px-5 ">
        <div className="flex gap-0 sm:gap-2 ">
          <Sidebar activeMenu={activeMenu} />
          <main className="relative flex w-full flex-col gap-1  sm:gap-2 md:w-[calc(100%-160px)]">
            <Navbar
              authenticated={authenticated}
              activeMenu={activeMenu}
              user={user}
              toggled={toggled}
              setToggled={setToggled}
              menuHandler={menuHandler}
            />
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
