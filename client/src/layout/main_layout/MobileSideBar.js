import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Close } from "@mui/icons-material";
import MenuConfig from "../../config/menu.config";
const MobileSideBar = React.forwardRef(({ activeMenu, setToggled }, ref) => {
  const location = useLocation();
  const closeMenuHandler = () => {
    setToggled(false);
  };

  return (
    <div
      className=" flex h-screen w-full justify-between bg-white pt-3 align-baseline lg:hidden"
      ref={ref}
    >
      <ul className="flex flex-col gap-1">
        {MenuConfig()[activeMenu]?.map((item) => (
          <div
            key={item.id}
            className={` ${
              location.pathname === item.path ? "text-purple-500" : "text-black"
            }`}
          >
            <Link
              to={item.path}
              className="flex  items-center gap-1 capitalize"
              onClick={closeMenuHandler}
            >
              {item.icon}
              <span className="capitalize">{item.name}</span>
            </Link>
          </div>
        ))}
      </ul>
      <Close
        fontSize="large"
        className="cursor-pointer"
        onClick={closeMenuHandler}
      />
    </div>
  );
});

export default MobileSideBar;
