import express from "express";
import RoleController from "../controllers/roleController.js";

const router = express.Router();

router.get("", RoleController.getRoles);
router.post("/add-role", RoleController.createRole);
router.delete("/delete-role/:id_role", RoleController.deleteRole);

export default router;
