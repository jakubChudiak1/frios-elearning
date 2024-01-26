import express from "express";
import AccessController from "../controllers/accessController.js";
import verifyToken from "../middlewares/authToken.js";
import checkRole from "../middlewares/checkRole.js";
import checkEditable from "../middlewares/checkEditable.js";

const router = express.Router();

router.get("", AccessController.getAccesses);
router.get("/user-access", verifyToken, AccessController.getUsersAccesses);
router.get("/status", AccessController.getAccessByStatus);
router.get(
  "/users-subjects",
  verifyToken,
  AccessController.getUsersSubjectsByStatus
);
router.get(
  "/user-requests",
  [verifyToken, checkRole([1, 2])],
  AccessController.getUsersRequests
);
router.get(
  "/access-status/:subject_id",
  verifyToken,
  AccessController.getAccessStatus
);
router.get(
  "/editable-subjects",
  verifyToken,
  AccessController.getEditableSubjects
);
router.get(
  "/is-editable/:subject_id",
  verifyToken,
  checkEditable,
  AccessController.getIsSubjectEditableByUser
);

router.post("/add-access", verifyToken, AccessController.createAccess);
router.patch("/update-status/:access_id", AccessController.updateStatus);

router.patch("/accept-status/:access_id", AccessController.acceptStatus);
router.patch("/reject-status/:access_id", AccessController.rejectStatus);
router.delete("/delete/:access_id", AccessController.deleteAccess);

export default router;
