import express from "express";
import ChapterController from "../controllers/chapterController.js";
import checkEditable from "../middlewares/checkEditable.js";
import verifyToken from "../middlewares/authToken.js";
import checkRole from "../middlewares/checkRole.js";

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
  checkRole([1, 2]),
  checkEditable,
  ChapterController.createMainChapter
);
router.post(
  "/create-side-chapter",
  verifyToken,
  checkRole([1, 2]),
  checkEditable,
  ChapterController.createSideChapter
);
router.patch(
  "/chapter/:chapter_id",
  verifyToken,
  checkRole([1, 2]),
  checkEditable,
  ChapterController.updateChaptersContent
);
router.patch(
  "/chapter-name/:chapter_id",
  verifyToken,
  checkRole([1, 2]),
  checkEditable,
  ChapterController.updateChaptersName
);
router.patch(
  "/published/:chapter_id",
  verifyToken,
  checkRole([1, 2]),
  checkEditable,
  ChapterController.updateChapterPublished
);

router.delete(
  "/:subject_id/delete-chapter/:chapter_id",
  verifyToken,
  checkRole([1, 2]),
  checkEditable,
  ChapterController.deleteChapter
);

export default router;
