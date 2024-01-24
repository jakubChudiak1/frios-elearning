import React, { useState } from "react";
import apiConfig from "../../config/api.config";
import { Link } from "react-router-dom";
import Overlay from "../UI/Overlay";
import SubjectModification from "./SubjectModification";
import { useSelector } from "react-redux";
const SubjectItem = ({ subject, loader }) => {
  const { editModeState } = useSelector((state) => state.editModeState);
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      className="flex h-full flex-col "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/subject/${subject?.subject_id}`}>
        <div className="relative aspect-[1/.5] w-full overflow-hidden">
          <img
            loading="lazy"
            src={apiConfig.images.subjectImage(subject.image_path)}
            alt={subject.subjects_name}
            className=" h-full w-full object-cover"
          />
          {loader && <div className="swiper-lazy-preloader"></div>}
          {hovered && <Overlay />}
          {editModeState && (
            <SubjectModification
              subject_id={subject.subject_id}
              subject={subject}
            />
          )}
        </div>

        <div className="flex flex-col pt-2 capitalize">
          <h3 className="break-words text-[16px] font-semibold capitalize">
            {subject.subjects_name}
          </h3>
          <p className=" text-[12px]">{subject.creators_name}</p>
          <div className="flex justify-between">
            <p className="capitalize">Počet kapitol</p>
            <p>{subject.chapter_count}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default SubjectItem;
