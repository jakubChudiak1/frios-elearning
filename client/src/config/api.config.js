const images = {
  subjectImage: (imagePath) =>
    `${process.env.REACT_APP_CLOUD_STORAGE}${imagePath}`,
};

const apiConfig = {
  images,
};

export default apiConfig;
