import React from "react";
import { Link } from "react-router-dom";
import SearchForm from "../../components/search_form/SearchForm";
import UserProfileImage from "../../components/user_profile/UserProfileImage";
import { useMediaQuery } from "react-responsive";
import LanguagePicker from "../../components/language/LanguagePicker";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = ({ authenticated, user }) => {
  const { t } = useTranslation();
  return (
    <header className="relative w-full pb-1 pt-5">
      <nav className="relative flex w-full items-center justify-between capitalize">
        <div className=" hidden w-1/2 min-w-max items-center md:flex ">
          <SearchForm onClose={() => {}} />
        </div>
        {!authenticated ? (
          <div className="flex  items-center gap-3 whitespace-nowrap">
            <LanguagePicker />
            <Link to={`signin`}>
              <div className="flex h-10  cursor-pointer items-center bg-purple-500 px-3 text-center font-medium capitalize text-white">
                <span>{t("navbar.signIn")}</span>
              </div>
            </Link>
            <Link to={`signup`} className="hidden sm:block">
              <div className="flex h-10  cursor-pointer items-center  border-2 border-purple-500 px-3 text-center font-medium capitalize">
                <span> {t("navbar.signUp")}</span>
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <LanguagePicker />
            <UserProfileImage user={user} handleMenuClick={true} />
          </div>
        )}
      </nav>
    </header>
  );
};
export default Navbar;
