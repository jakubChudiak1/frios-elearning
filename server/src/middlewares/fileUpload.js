import upload from "../config/multer.js";

const fileUpload = (fileExtension) => {
  const multerMiddleware = upload(fileExtension).single("upload");
  return (req, res, next) => {
    multerMiddleware(req, res, (error) => {
      if (error) {
        return next(error);
      }
      if (!req.file) {
        req.file = null;
      }
      next();
    });
  };
};
export default fileUpload;
