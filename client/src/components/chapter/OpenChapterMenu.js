import React from "react";
import ArrowForward from "../UI/ArrowForward";
import { useTranslation } from "react-i18next";
const OpenChapterMenu = ({ sideBarHandler }) => {
  const { t } = useTranslation();
  return (
    <div className="absolute right-0 top-[13%] w-max " onClick={sideBarHandler}>
      <ArrowForward text={t("chapters.openSidebar")} />
    </div>
  );
};

export default OpenChapterMenu;
