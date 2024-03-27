import React from "react";
import { Link, useParams } from "react-router-dom";

const Logo = () => {
  const { lang } = useParams();

  return (
    <h1 className="flex items-center font-semibold text-purple-500">
      <Link to={`/${lang}`} className="text-3xl">
        FriOS
      </Link>
    </h1>
  );
};

export default Logo;
