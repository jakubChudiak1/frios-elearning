import React from "react";
import CategoryItem from "./CategoryItem";
import { Swiper, SwiperSlide } from "swiper/react";

const CategoryList = ({ categories }) => {
  return (
    <div className="relative mt-2 w-full sm:mt-0">
      <Swiper slidesPerView={"auto"} spaceBetween={15}>
        {categories?.map((category) => (
          <SwiperSlide key={category.category_id}>
            <CategoryItem category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryList;
