import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const RequireRole = ({ roles, children }) => {
  const { user, isLoading } = useAuth();
  console.log(roles?.includes(user?.id_role));
  if (!isLoading) {
    if (roles?.includes(user?.id_role)) {
      return <>{children}</>;
    } else {
      return <Navigate to={"/"} />;
    }
  }
};

export default RequireRole;
