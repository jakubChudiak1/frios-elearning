import React from "react";
import { Link } from "react-router-dom";
import { Close } from "@mui/icons-material";
import menuConfig from "../../config/menu.config";
const MobileSideBar = ({ activeMenu, setToggled }) => {
  const closeMenuHandler = () => {
    setToggled(false);
  };

  return (
    <div className="absolute left-0 top-[100%] z-10 flex h-[50vh] w-full justify-between bg-white pt-3 align-baseline">
      <ul className="flex flex-col gap-2">
        {menuConfig[activeMenu]?.map((item) => (
          <div key={item.id} className=" hover:text-purple-500">
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
};

export default MobileSideBar;
