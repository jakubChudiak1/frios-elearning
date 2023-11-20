import React from "react";
import menuConfig from "../../config/menu.config";
import { Link } from "react-router-dom";
import Logo from "../../components/UI/Logo";

const Sidebar = ({ activeMenu }) => {
  return (
    <aside className="flex min-h-screen w-0 flex-col gap-3 overflow-hidden whitespace-nowrap py-5 md:w-[80px] lg:w-[160px]">
      <Logo />
      <ul className="flex list-none flex-col items-baseline gap-3 md:items-center lg:items-baseline">
        {menuConfig[activeMenu]?.map((item) => (
          <div key={item.id} className=" hover:text-purple-500">
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
