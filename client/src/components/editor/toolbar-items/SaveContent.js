import React from "react";
import { useTranslation } from "react-i18next";
const SaveContent = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <span
      className="cursor-pointer pb-5 pl-1 text-[14px] capitalize hover:text-[#a855f7]"
      onClick={onClick}
    >
      {t("editor.save")}
    </span>
  );
};

export default SaveContent;
