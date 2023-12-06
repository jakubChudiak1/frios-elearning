import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const RequireNoAuth = ({ children }) => {
  const { authenticated } = useAuth();
  if (!authenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default RequireNoAuth;
