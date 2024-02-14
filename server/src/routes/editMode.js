import express from "express";
import EditModeController from "../controllers/editModeController.js";
import verifyToken from "../middlewares/authToken.js";
import checkRole from "../middlewares/checkRole.js";

const router = express.Router();

router.patch(
  "/set-mode",
  verifyToken,
  checkRole([1, 2]),
  EditModeController.setEditMode
);

export default router;
