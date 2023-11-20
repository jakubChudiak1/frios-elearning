import React from "react";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@mui/icons-material";
import SearchForm from "../../components/search_form/SearchForm";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import UserProfileImage from "../../components/user_profile/UserProfileImage";
import Logo from "../../components/UI/Logo";
import MobileSideBar from "./MobileSideBar";

const Navbar = ({
  authenticated,
  user,
  toggled,
  setToggled,
  menuHandler,
  activeMenu,
}) => {
  return (
    <header className="relative w-full pb-1 pt-5">
      <nav className="relative flex w-full items-center justify-between capitalize">
        <div className="flex items-center md:hidden ">
          <MenuOutlined fontSize="large" onClick={menuHandler} />
          <Logo />
        </div>
        {toggled && (
          <MobileSideBar activeMenu={activeMenu} setToggled={setToggled} />
        )}
        <div className=" hidden w-1/2 min-w-max items-center md:flex ">
          <SearchForm />
        </div>
        {!authenticated ? (
          <div className="flex  items-center gap-3 whitespace-nowrap">
            <Link to={"/signin"}>
              <div className="flex h-10  cursor-pointer items-center bg-purple-500 px-3 text-center font-medium capitalize text-white">
                <span>prihlásiť</span>
              </div>
            </Link>
            <Link to={"/signup"} className="hidden sm:block">
              <div className="flex h-10  cursor-pointer items-center  border-2 border-purple-500 px-3 text-center font-medium capitalize">
                <span>vytvoriť účet</span>
              </div>
            </Link>
          </div>
        ) : (
          <UserProfileImage user={user} enableHandler={true} />
        )}
      </nav>
    </header>
  );
};
export default Navbar;
