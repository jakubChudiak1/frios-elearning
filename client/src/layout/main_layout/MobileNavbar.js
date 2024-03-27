import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@mui/icons-material";
import Logo from "../../components/UI/Logo";
import SearchIcon from "@mui/icons-material/Search";
import UserProfileImage from "../../components/user_profile/UserProfileImage";
import MobileSideBar from "./MobileSideBar";
import SearchForm from "../../components/search_form/SearchForm";
import useOnclickOutside from "react-cool-onclickoutside";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import LanguagePicker from "../../components/language/LanguagePicker";
import { useTranslation } from "react-i18next";

const MobileNavbar = ({ authenticated, user, activeMenu }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toggled, setToggled] = useState(false);
  const showSearchBar = useMediaQuery({ query: "max-width:768px" });
  const { t } = useTranslation();
  const sidebarRef = useOnclickOutside(
    () => {
      setToggled(false);
    },
    {
      ignoreClass: "toggle",
    },
  );

  const searchRef = useOnclickOutside(
    () => {
      setIsSearchOpen(false);
    },
    { ignoreClass: "search-icon" },
  );

  const menuHandler = () => {
    setToggled((prev) => !prev);
  };

  const searchHandler = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const closeSearchForm = () => {
    setIsSearchOpen(false);
  };

  if (toggled) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "auto";
  }

  return (
    <header className="relative z-[1000] w-full pb-1 pt-5">
      <nav className="relative flex w-full items-center justify-between capitalize">
        <div className="flex items-center">
          <MenuOutlined
            fontSize="large"
            onClick={menuHandler}
            className="toggle"
          />
          <SearchIcon
            onClick={searchHandler}
            className="search-icon z-[10000]"
          />
        </div>

        <motion.div
          className="absolute left-0  w-full overflow-hidden  bg-white "
          ref={searchRef}
          initial={{
            height: "0",
            top: "100%",
          }}
          animate={{
            height: isSearchOpen ? "80px" : "0",
          }}
        >
          <SearchForm onClose={closeSearchForm} />
        </motion.div>

        <motion.div
          className="absolute top-[100%] z-[1000] w-full"
          initial={{
            opacity: 0,
            left: "-120%",
          }}
          animate={{
            opacity: toggled ? 1 : 0,
            left: toggled ? 0 : "-120%",
          }}
        >
          <MobileSideBar
            activeMenu={activeMenu}
            setToggled={setToggled}
            ref={sidebarRef}
          />
        </motion.div>
        <Logo />
        {!authenticated ? (
          <div className="flex items-center gap-1 whitespace-nowrap">
            <LanguagePicker />
            <Link to={"/signin"}>
              <div className="flex h-10  cursor-pointer items-center bg-purple-500 px-3 text-center font-medium capitalize text-white">
                <span>{t("navbar.signIn")}</span>
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <LanguagePicker />
            <UserProfileImage user={user} handleMenuClick={true} />
          </div>
        )}
      </nav>
    </header>
  );
};

export default MobileNavbar;
