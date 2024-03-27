import express from "express";
import SubjectController from "../controllers/subjectController.js";
import verifyToken from "../middlewares/authToken.js";
import fileUpload from "../middlewares/fileUpload.js";
import cacheData from "../middlewares/cache.js";
import checkRole from "../middlewares/checkRole.js";
import checkEditable from "../middlewares/checkEditable.js";
const router = express.Router();

router.get("", SubjectController.getSubjects);
router.get("/search", SubjectController.getSubjectByString);
router.get("/creator", SubjectController.getSubjectByCreator);
router.get("/recommended", SubjectController.getRecommendedSubjects);
router.get("/category", SubjectController.getSubjectsByCategory);
router.get("/status", SubjectController.getSubjectsByStatus);
router.get("/name", SubjectController.getSubjectByName);
router.get("/:subject_id", SubjectController.getSubjectById);

router.post(
  "/add-subject",
  verifyToken,
  fileUpload(["jpg", "png"]),
  checkRole([1, 2]),
  SubjectController.createSubject
);

router.patch(
  "/update-subject/:subject_id",
  verifyToken,
  checkEditable,
  SubjectController.updateSubject
);
router.patch(
  "/update-description/:subject_id",
  verifyToken,
  checkRole([1, 2]),
  checkEditable,
  SubjectController.updateDescription
);
router.patch(
  "/change-visibility/:subject_id",
  verifyToken,
  checkRole([1, 2]),
  checkEditable,
  SubjectController.changeVisibility
);
router.delete(
  "/delete-subject/:subject_id",
  verifyToken,
  checkRole([1, 2]),
  checkEditable,
  SubjectController.deleteSubject
);

export default router;
