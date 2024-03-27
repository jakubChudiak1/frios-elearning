import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const RequireRole = ({ roles, children }) => {
  const { user, isLoading } = useAuth();
  if (!isLoading) {
    if (roles?.includes(user?.role_id)) {
      return <>{children}</>;
    } else {
      return <Navigate to={"/"} />;
    }
  }
};

export default RequireRole;
