import React from "react";
import { useTranslation } from "react-i18next";
const Headers = () => {
  const { t } = useTranslation();
  return (
    <select className="ql-header capitalize" defaultValue="5">
      <option value="1">{t("editor.headers.header1")}</option>
      <option value="2">{t("editor.headers.header2")}</option>
      <option value="3">{t("editor.headers.header3")}</option>
      <option value="4">{t("editor.headers.header4")}</option>
      <option value="5">{t("editor.headers.normal")}</option>
    </select>
  );
};

export default Headers;
