import Category from "../models/category.js";
import redisClient from "../config/redisClient.js";

class CategoryController {
  static async getCategories(req, res) {
    try {
      const categories = await Category.getCategories();
      await redisClient.setEx(
        req.originalUrl,
        3600,
        JSON.stringify(categories)
      );
      res.json(categories);
    } catch (error) {
      console.log(error);
    }
  }

  static async createCategory(req, res) {
    try {
      const { name } = req.body;
      const category = await Category.createCategory({ name });
      res.status(201).json({ message: "Category created successfully" });
    } catch (error) {
      console.log(error);
    }
  }
}
export default CategoryController;
