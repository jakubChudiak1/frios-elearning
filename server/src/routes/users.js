import express from "express";
import UserController from "../controllers/userController.js";
import verifyToken from "../middlewares/authToken.js";
import checkRole from "../middlewares/checkRole.js";
const router = express.Router();

router.get("", verifyToken, checkRole([1, 2]), UserController.getUsers);
router.get("/user-info", verifyToken, UserController.getUsersInfo);
router.get("/:email", verifyToken, UserController.getUserByEmail);

export default router;
