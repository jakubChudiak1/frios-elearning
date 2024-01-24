import React from "react";
import CategoryItem from "./CategoryItem";
import { Swiper, SwiperSlide } from "swiper/react";
import AddCategoryButton from "./AddCategoryButton";
import { useSelector } from "react-redux";

const CategoryList = ({ categories }) => {
  const { editModeState } = useSelector((state) => state.editModeState);
  return (
    <div className="relative mt-2 w-full sm:mt-0">
      <Swiper slidesPerView={"auto"} spaceBetween={15}>
        {editModeState && (
          <SwiperSlide>
            <AddCategoryButton />
          </SwiperSlide>
        )}
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
