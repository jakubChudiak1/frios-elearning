import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const RequireRole = ({ roleId, children }) => {
  const { user, isLoading } = useAuth();
  if (!isLoading) {
    if (user?.id_role === roleId) {
      return <>{children}</>;
    } else {
      return <Navigate to={"/"} />;
    }
  }
};

export default RequireRole;
