import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../components/UI/Logo";
import MenuConfig from "../../config/menu.config";

const Sidebar = ({ activeMenu }) => {
  const location = useLocation();
  console.log(location);
  return (
    <aside className=" hidden min-h-screen w-0 flex-col gap-3 overflow-hidden whitespace-nowrap py-0 sm:flex sm:py-5 lg:w-[160px]">
      <Logo />
      <ul className="flex list-none flex-col items-baseline gap-2 pl-0 md:items-center lg:items-baseline">
        {MenuConfig()[activeMenu]?.map((item) => (
          <div
            key={item.id}
            className={` ${
              location.pathname.split("/")[2] === item.path
                ? "text-purple-500"
                : "text-black"
            }`}
          >
            <Link to={item.path} className="flex items-center gap-1 capitalize">
              {item.icon}
              <span className="hidden sm:hidden md:hidden lg:block">
                {item.name}
              </span>
            </Link>
          </div>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
