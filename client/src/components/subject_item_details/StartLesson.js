import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import { useAccess } from "../../context/accessContext";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const StartLesson = ({ subjectDetails }) => {
  const { access, setSubjectId, areLoading } = useAccess();
  const { subject_id } = useParams();
  const { authenticated, user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    setSubjectId(subject_id);
  }, [subject_id]);

  const accessHandler = async () => {
    try {
      const response = await axios.post("/accesses/add-access", {
        user_id: user?.user_id,
        subject_id: subject_id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {subjectDetails && (
        <div className="max-w-[150px] pt-3 text-center">
          {access?.status === "accepted" || subjectDetails?.is_public ? (
            <Link to={`/${subjectDetails.subject_id}/chapter/1`}>
              <div className="bg-purple-500 px-2 py-2 font-medium text-white">
                <p>Prejsť k lekciám</p>
              </div>
            </Link>
          ) : (
            <Button
              className="w-full bg-purple-500 px-2 py-2 text-[14px] font-medium text-white"
              onClick={
                authenticated
                  ? accessHandler
                  : () => {
                      navigate("/signin");
                    }
              }
            >
              Požiadať o prístup
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default StartLesson;
