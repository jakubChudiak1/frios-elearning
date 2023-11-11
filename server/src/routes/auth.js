import express from "express";
import AuthController from "../controllers/authController.js";
import signup from "../middlewares/signup.js";
import verifyToken from "../middlewares/authToken.js";

const router = express.Router();

router.get("/isvalid", verifyToken, AuthController.isValid);
router.post("/signup", signup, AuthController.signUp);
router.post("/signin", AuthController.signIn);
router.post("/signout", verifyToken, AuthController.signOut);

export default router;
