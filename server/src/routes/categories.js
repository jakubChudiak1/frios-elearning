import express from "express";
import CategoryController from "../controllers/categoryController.js";
import cacheData from "../middlewares/cache.js";
const router = express.Router();

router.get("", cacheData, CategoryController.getCategories);
router.post("/add-category", CategoryController.createCategory);

export default router;
