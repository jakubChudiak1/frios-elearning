import express from "express";
import TranslateController from "../controllers/translateController.js";

const router = express.Router();

router.get("/:lang", TranslateController.getTranslation);

export default router;
