import React from "react";
import { Outlet, useLocation, Navigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import useFetchData from "../../hooks/useFetchData";
import apiConfig from "../../config/api.config";
import { useAccess } from "../../context/accessContext";

const RequireAuth = () => {
  const { subject_id } = useParams();
  const { authenticated, loading } = useAuth();
  const { access, areLoading } = useAccess();
  const location = useLocation();
  const subject = useFetchData(
    apiConfig.subjectRoutes.getSubjectById(subject_id),
  );

  if (subject.isLoading || areLoading) {
    return <div>loading</div>;
  }

  if (subject.data && !areLoading && !loading) {
    console.log(areLoading);
    console.log(loading);
    if (subject.data?.is_public) {
      return <Outlet />;
    } else {
      if (authenticated) {
        if (access?.status === "accepted") {
          console.log("accepted");
          return <Outlet />;
        } else {
          console.log("refuse");
          return <Navigate to={"/"} />;
        }
      } else {
        return <Navigate to="/signin" state={{ from: location }} />;
      }
    }
  }
};

export default RequireAuth;
{
  /* {subject.data &&
        (subject.data?.is_public ||
        (authenticated && access?.status === "accepted") ? (
          <Outlet />
        ) : (
          <Navigate to={"/signin"} state={{ from: location }} />
        ))} */
}
