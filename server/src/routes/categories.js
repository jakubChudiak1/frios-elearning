import express from "express";
import CategoryController from "../controllers/categoryController.js";
import cacheData from "../middlewares/cache.js";
import verifyToken from "../middlewares/authToken.js";
import checkRole from "../middlewares/checkRole.js";
const router = express.Router();

router.get("", cacheData, CategoryController.getCategories);
router.post(
  "/add-category",
  verifyToken,
  checkRole([1, 2]),
  CategoryController.createCategory
);
router.patch(
  "/update-category/:category_id",
  verifyToken,
  checkRole([1, 2]),
  CategoryController.updateCategory
);
router.delete(
  "/delete-category/:category_id",
  verifyToken,
  checkRole([1]),
  CategoryController.deleteCategory
);

export default router;
