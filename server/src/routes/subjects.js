import express from "express";
import SubjectController from "../controllers/subjectController.js";
import verifyToken from "../middlewares/authToken.js";
import fileUpload from "../middlewares/fileUpload.js";
import cacheData from "../middlewares/cache.js";
const router = express.Router();

router.get("", cacheData, SubjectController.getSubjects);
router.get("/search", SubjectController.getSubjectByString);
router.get("/creator", SubjectController.getSubjectByCreator);
router.get("/recommended", SubjectController.getRecommendedSubjects);
router.get("/category", SubjectController.getSubjectsByCategory);
router.get("/status", cacheData, SubjectController.getSubjectsByStatus);
router.get("/name", SubjectController.getSubjectByName);
router.get("/:subject_id", SubjectController.getSubjectById);

router.post(
  "/add-subject",
  verifyToken,
  fileUpload(["jpg", "png"]),
  SubjectController.createSubject
);
router.patch("/update-subject/:subject_id", SubjectController.updateSubject);
router.delete("/delete-subject/:subject_id", SubjectController.deleteSubject);

export default router;
