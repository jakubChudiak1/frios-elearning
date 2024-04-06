import upload from "../config/multer.js";

const fileUpload = (fileExtension) => {
  const multerMiddleware = upload(fileExtension).single("upload");
  return (req, res, next) => {
    multerMiddleware(req, res, (error) => {
      if (error) {
        return res.status(500).json(error);
      }
      if (!req.file) {
        req.file = null;
        return res.status(500).json({ message: "image not found" });
      }
      next();
    });
  };
};
export default fileUpload;
