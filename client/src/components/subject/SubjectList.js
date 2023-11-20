import React from "react";
import SubjectItem from "./SubjectItem";
import breakpoints from "../../config/swiper.config";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const SubjectList = ({ subjects, text }) => {
  return (
    <>
      {subjects && (
        <div className=" relative mt-5 flex flex-col align-baseline">
          <h2 className="text-[20px] capitalize">{text}</h2>
          <div className="relative mt-4">
            <Swiper
              modules={[Navigation]}
              breakpoints={breakpoints.subjectsBreakpoints}
              navigation
              spaceBetween={14}
              className="relative z-0"
            >
              {subjects?.map((subject) => (
                <SwiperSlide key={subject.subject_id}>
                  <SubjectItem key={subject.subject_id} subject={subject} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default SubjectList;
