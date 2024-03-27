import React from "react";
import { useLocation, Link } from "react-router-dom";
import { languages } from "../../config/language.config";

const LanguagePicker = () => {
  const location = useLocation();

  const switchLanguageHandler = (lang) => {
    const path = location.pathname.split("/");
    path[1] = lang;
    return path.join("/");
  };
  return (
    <div className="flex cursor-pointer items-center  gap-1  uppercase">
      {languages.map((item) => (
        <Link
          key={item.id}
          to={switchLanguageHandler(item.name)}
          className={` ${
            location.pathname.split("/")[1] === item.name
              ? "text-purple-500"
              : "text-black"
          } text-[16px]`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default LanguagePicker;
