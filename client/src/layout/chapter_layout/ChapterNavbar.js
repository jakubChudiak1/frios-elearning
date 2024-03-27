import React from "react";
import Logo from "../../components/UI/Logo";
import { Link } from "react-router-dom";
import UserProfileImage from "../../components/user_profile/UserProfileImage";
import LanguagePicker from "../../components/language/LanguagePicker";

const ChapterNavbar = ({ authenticated, user }) => {
  return (
    <header className="relative w-full px-2 pb-3  pt-5 ">
      <nav className="relative flex w-full items-center justify-between capitalize">
        <Logo />
        {!authenticated ? (
          <div className="flex  items-center gap-1 whitespace-nowrap sm:gap-3">
            <LanguagePicker />
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
          <div className="flex items-center gap-1 sm:gap-3">
            <LanguagePicker />
            <UserProfileImage user={user} handleMenuClick={true} />
          </div>
        )}
      </nav>
    </header>
  );
};

export default ChapterNavbar;
