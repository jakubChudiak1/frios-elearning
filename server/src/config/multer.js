import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = (fileTypes) =>
  multer({
    limits: {
      fieldSize: 1000000,
    },
    storage: storage,
    fileFilter(req, file, cb) {
      const allowedFileTypes = Array.isArray(fileTypes)
        ? fileTypes
        : [fileTypes];

      if (allowedFileTypes.some((type) => file.originalname.endsWith(type))) {
        return cb(null, true);
      } else {
        return cb(
          new Error(`Please upload only ${allowedFileTypes.join(", ")} files`)
        );
      }
    },
  });

export default upload;
