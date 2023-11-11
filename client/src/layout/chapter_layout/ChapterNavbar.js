import React from "react";
import Logo from "../../components/UI/Logo";
import { Link } from "react-router-dom";
import UserProfileImage from "../../components/user_profile/UserProfileImage";

const ChapterNavbar = ({ authenticated, user }) => {
  return (
    <header className="relative w-full py-5 2xl:px-5">
      <nav className=" flex items-center justify-between">
        <Logo />
        {authenticated ? (
          <UserProfileImage user={user} />
        ) : (
          <div className="flex  items-center gap-3 whitespace-nowrap">
            <Link to={"/signin"}>
              <div className="flex h-10  cursor-pointer items-center bg-purple-500 px-3 text-center font-medium capitalize text-white">
                <span>{authenticated ? "odhlásiť" : "prihlásiť"}</span>
              </div>
            </Link>
            <Link to={"/signup"} className="hidden sm:block">
              <div className="flex h-10  cursor-pointer items-center  border-2 border-purple-500 px-3 text-center font-medium capitalize">
                <span>vytvoriť účet</span>
              </div>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default ChapterNavbar;
