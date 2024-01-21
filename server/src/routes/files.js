import express from "express";
import FilesController from "../controllers/filesController.js";
import fileUpload from "../middlewares/fileUpload.js";
const router = express.Router();

router.get("", FilesController.getFiles);
router.get("/:file_id", FilesController.getFileById);
router.post(
  "/add-file",
  fileUpload(["jpg", "png"]),
  FilesController.createFile
);
export default router;
