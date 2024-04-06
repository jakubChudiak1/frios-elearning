import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { KeyboardBackspace } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
const ArrowBack = ({ link, showed }) => {
  const { t } = useTranslation();
  return (
    <Link
      to={link}
      className={`block cursor-pointer lg:${showed} w-max self-baseline`}
    >
      <motion.div
        className="flex items-center capitalize text-[#a855f7]"
        whileHover={{ x: -5 }}
      >
        <KeyboardBackspace fontSize="large" />
        <p className="text-[16px]">{t("arrows.back")}</p>
      </motion.div>
    </Link>
  );
};

export default ArrowBack;
