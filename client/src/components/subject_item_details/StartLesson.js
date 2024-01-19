import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import { useAuth } from "../../context/authContext";
import { toast, ToastContainer } from "react-toastify";
import { useGetSubjectChaptersQuery } from "../../api/endpoints/chaptersEndpoints";
import { useAddAccessMutation } from "../../api/endpoints/accessesEndpoints";
import { useGetAccessStatusQuery } from "../../api/endpoints/accessesEndpoints";

const StartLesson = ({ subjectDetails }) => {
  const { subject_id } = useParams();
  const { authenticated, user } = useAuth();
  const { data: subjectChapter } = useGetSubjectChaptersQuery(subject_id);
  const { data: accessStatus } = useGetAccessStatusQuery(subject_id);
  const [addAccess] = useAddAccessMutation();
  const navigate = useNavigate();
  const accessHandler = () => {
    addAccess({
      user_id: user?.user_id,
      subject_id: subject_id,
    });
    toast.success("Vaša žiadosť bola odoslaná", {
      position: "bottom-right",
      autoClose: 3000,
      className: "success-notification",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      progressClassName: "progress-bar",
    });
  };

  return (
    <>
      {subjectDetails && (
        <div className="max-w-[150px] pt-3 text-center">
          {accessStatus?.status === "accepted" || subjectDetails?.is_public ? (
            <Link
              to={`/${subjectDetails.subject_id}/chapter/${
                subjectChapter ? subjectChapter[0]?.chapter_id : ""
              }`}
            >
              <div className="bg-purple-500 px-2 py-2 font-medium text-white">
                <p>Prejsť k lekciám</p>
              </div>
            </Link>
          ) : (
            <Button
              className="w-full bg-purple-500 px-2 py-2 text-[14px] font-medium text-white"
              disabled={
                accessStatus?.status === "accepted" ||
                accessStatus?.status === "pending" ||
                accessStatus?.status === "rejected"
              }
              onClick={
                authenticated
                  ? accessHandler
                  : () => {
                      navigate("/signin");
                    }
              }
            >
              {accessStatus?.status == null
                ? "Požiadať o prístup"
                : accessStatus?.status}
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default StartLesson;
