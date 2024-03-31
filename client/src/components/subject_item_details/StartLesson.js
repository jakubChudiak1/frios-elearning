import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import { useAuth } from "../../context/authContext";
import { toast, ToastContainer } from "react-toastify";
import { useGetSubjectChaptersQuery } from "../../api/endpoints/chaptersEndpoints";
import { useAddAccessMutation } from "../../api/endpoints/accessesEndpoints";
import { useGetAccessStatusQuery } from "../../api/endpoints/accessesEndpoints";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const StartLesson = ({ subjectDetails }) => {
  const { editModeState } = useSelector((state) => state.editModeState);
  const { subject_id } = useParams();
  const { lang } = useParams();
  const { authenticated, user } = useAuth();
  const { data: subjectChapter } = useGetSubjectChaptersQuery({
    subjectId: subject_id,
    published: editModeState ? false : true,
  });
  console.log(subjectChapter);
  const { data: accessStatus } = useGetAccessStatusQuery(subject_id);
  const [addAccess] = useAddAccessMutation();
  const navigate = useNavigate();
  const accessHandler = () => {
    addAccess({
      user_id: user?.user_id,
      subject_id: subject_id,
    });
    toast.success(t("request.requestSent"), {
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
  const { t } = useTranslation();
  return (
    <>
      {subjectDetails && (
        <div className="max-w-[150px] pt-3 text-center capitalize">
          {accessStatus?.status === "accepted" || subjectDetails?.is_public ? (
            <Link
              to={`${
                subjectChapter?.length > 0
                  ? `/${lang}/${subjectDetails.subject_id}/chapter/${
                      subjectChapter ? subjectChapter[0]?.chapter_id : ""
                    }`
                  : `/${lang}/${subject_id}/chapter`
              }`}
            >
              <div className="bg-purple-500 px-2 py-2  font-medium text-white">
                <p>{t("subjectDetails.goToLessons")}</p>
              </div>
            </Link>
          ) : (
            <Button
              className="w-full bg-purple-500 px-2 py-2 text-[14px] font-medium capitalize text-white"
              disabled={
                accessStatus?.status === "accepted" ||
                accessStatus?.status === "pending" ||
                accessStatus?.status === "rejected"
              }
              onClick={
                authenticated
                  ? accessHandler
                  : () => {
                      navigate(`/${lang}/signin`);
                    }
              }
            >
              {accessStatus?.status == null
                ? t("subjectDetails.askForAccess")
                : accessStatus?.status === "pending"
                ? t("request.requestStatusSent")
                : t("request.requestRejected")}
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default StartLesson;
