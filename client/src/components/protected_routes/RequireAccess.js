import React from "react";
import { Navigate, useParams, Outlet } from "react-router-dom";
import { useGetAccessStatusQuery } from "../../api/endpoints/accessesEndpoints";
import { useGetSubjectByIdQuery } from "../../api/endpoints/subjectsEndpoints";
const RequireAccess = () => {
  const { subject_id } = useParams();
  const { data: access } = useGetAccessStatusQuery(subject_id);
  const { data: subject, isLoading } = useGetSubjectByIdQuery(subject_id);
  if (!isLoading) {
    if (access?.status === "accepted" || subject?.is_public) {
      return <Outlet />;
    } else {
      return <Navigate to={`/subject/${subject_id}`} />;
    }
  }
};

export default RequireAccess;
