import multer from "multer";
import path from "path";
import googleCloudStorage from "multer-cloud-storage";
import dotenv from "dotenv";

dotenv.config();
const storage = googleCloudStorage.storageEngine({
  autoRetry: true,
  bucket: process.env.GCS_BUCKET,
  projectId: process.env.GCLOUD_PROJECT,
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: process.env.GCS_PRIVATE_KEY,
  },
  destination: (req, file, cb) => {
    cb(null, "/public/images");
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
