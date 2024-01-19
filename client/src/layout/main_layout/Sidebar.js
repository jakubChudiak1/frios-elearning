import React from "react";
import menuConfig from "../../config/menu.config";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../components/UI/Logo";

const Sidebar = ({ activeMenu }) => {
  const location = useLocation();

  return (
    <aside className=" hidden min-h-screen w-0 flex-col gap-3 overflow-hidden whitespace-nowrap py-0 sm:flex sm:py-5 lg:w-[140px]">
      <Logo />
      <ul className="flex list-none flex-col items-baseline gap-2 pl-0 md:items-center lg:items-baseline">
        {menuConfig[activeMenu]?.map((item) => (
          <div
            key={item.id}
            className={` ${
              location.pathname === item.path ? "text-purple-500" : "text-black"
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
