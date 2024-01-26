import express from "express";
import ChapterController from "../controllers/chapterController.js";

import verifyToken from "../middlewares/authToken.js";

const router = express.Router();

router.get("/:subject_id", ChapterController.getSubjectsChapters);

router.get("/chapter", ChapterController.getMainChapters);
router.get("/chapter/:main_chapter", ChapterController.getSideChapters);
router.get(
  "/:subject_id/chapter/:chapter_id",
  ChapterController.getChaptersContent
);
router.post(
  "/create-main-chapter",
  verifyToken,
  ChapterController.createMainChapter
);
router.post(
  "/create-side-chapter",
  verifyToken,
  ChapterController.createSideChapter
);
router.patch("/chapter/:chapter_id", ChapterController.updateChaptersContent);
export default router;
