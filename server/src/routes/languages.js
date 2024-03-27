import express from "express";
import LanguageController from "../controllers/languageController.js";

const router = express.Router();

router.get("", LanguageController.getLanguages);

export default router;
