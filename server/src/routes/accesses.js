import express from "express";
import AccessController from "../controllers/accessController.js";
import verifyToken from "../middlewares/authToken.js";
import checkChapterAccess from "../middlewares/checkChapterAccess.js";

const router = express.Router();

router.get("", AccessController.getAccesses);
router.get("/user-access", verifyToken, AccessController.getUsersAccesses);
router.get(
  "/access-status/:subject_id",
  checkChapterAccess,
  AccessController.getAccessStatus
);
router.get(
  "/users-subjects",
  verifyToken,
  AccessController.getUsersAccessedSubjects
);

router.post("/add-access", verifyToken, AccessController.createAccess);
router.patch("/update-status/:access_id", AccessController.updateStatus);

router.patch("/accept-status/:access_id", AccessController.acceptStatus);
router.patch("/reject-status/:access_id", AccessController.rejectStatus);

export default router;
