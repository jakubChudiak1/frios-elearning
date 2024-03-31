import React from "react";
import Logo from "../../components/UI/Logo";
import { Link, useParams } from "react-router-dom";
import UserProfileImage from "../../components/user_profile/UserProfileImage";
import LanguagePicker from "../../components/language/LanguagePicker";
import { useTranslation } from "react-i18next";

const ChapterNavbar = ({ authenticated, user }) => {
  const { lang } = useParams();
  const { t } = useTranslation();
  return (
    <header className="relative w-full  pb-3  pt-5 ">
      <nav className="relative flex w-full items-center justify-between capitalize">
        <Logo />
        {!authenticated ? (
          <div className="flex  items-center gap-1 whitespace-nowrap sm:gap-3">
            <LanguagePicker />
            <Link to={`/${lang}/signin`}>
              <div className="flex h-10  cursor-pointer items-center bg-purple-500 px-3 text-center font-medium capitalize text-white">
                <span>{t("navbar.signIn")}</span>
              </div>
            </Link>
            <Link to={`/${lang}/signup`} className="hidden sm:block">
              <div className="flex h-10  cursor-pointer items-center  border-2 border-purple-500 px-3 text-center font-medium capitalize">
                <span>{t("navbar.signUp")}</span>
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
