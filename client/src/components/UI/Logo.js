import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <h1 className="flex items-center font-semibold text-purple-500">
      <Link to={"/"} className="text-3xl">
        FriOS
      </Link>
    </h1>
  );
};

export default Logo;
