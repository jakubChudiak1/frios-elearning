import React, { useState } from "react";
import apiConfig from "../../config/api.config";
import { Link, useParams } from "react-router-dom";
import Overlay from "../UI/Overlay";
import SubjectModification from "./SubjectModification";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const SubjectItem = ({ subject, loader, editable }) => {
  const { editModeState } = useSelector((state) => state.editModeState);
  const [hovered, setHovered] = useState(false);
  const { lang } = useParams();
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  const { t } = useTranslation();
  return (
    <div
      className="flex h-full flex-col "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/${lang}/subject/${subject?.subject_id}`}>
        <div className="relative aspect-[1/.5] w-full overflow-hidden">
          <img
            loading="lazy"
            src={apiConfig.images.subjectImage(subject.image_path)}
            alt={subject.subjects_name}
            className=" h-full w-full object-cover"
          />
          {loader && <div className="swiper-lazy-preloader"></div>}
          {hovered && <Overlay />}
          {editModeState && editable && (
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
            <p className="capitalize">{t("subjectDetails.chaptersCount")}</p>
            <p>{subject.chapter_count}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default SubjectItem;
