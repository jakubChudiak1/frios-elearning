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
export default router;
