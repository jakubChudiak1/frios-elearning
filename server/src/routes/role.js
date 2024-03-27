import express from "express";
import RoleController from "../controllers/roleController.js";
import verifyToken from "../middlewares/authToken.js";
import checkRole from "../middlewares/checkRole.js";
const router = express.Router();

router.get("", RoleController.getRoles);
router.post(
  "/add-role",
  verifyToken,
  checkRole([1, 2]),
  RoleController.createRole
);
router.patch(
  "/update-role/:role_id",
  verifyToken,
  checkRole([1, 2]),
  RoleController.updateRole
);
router.delete(
  "/delete-role/:role_id",
  verifyToken,
  checkRole([1]),
  RoleController.deleteRole
);

export default router;
