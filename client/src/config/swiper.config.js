const swiperBreakpoints = ({ subjects }) => {
  return {
    100: {
      slidesPerView: subjects?.length === 1 ? 1 : 1.1,
    },
    200: {
      slidesPerView: subjects?.length === 1 ? 1 : 1.2,
    },
    300: {
      slidesPerView: subjects?.length === 1 ? 1 : 1.1,
    },
    390: {
      slidesPerView: subjects?.length === 1 ? 1.1 : 1.1,
    },
    450: {
      slidesPerView: subjects?.length === 1 ? 1.1 : 1.1,
    },
    624: {
      slidesPerView: 3.1,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
    1168: {
      slidesPerView: 4,
    },
  };
};

export default swiperBreakpoints;
