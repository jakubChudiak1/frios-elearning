import Category from "../models/category.js";
import redisClient from "../config/redisClient.js";
import createCategoryValidation from "../validations/validateCreateCategory.js";

class CategoryController {
  static async getCategories(req, res) {
    try {
      console.log(req.originalUrl);
      const categories = await Category.getCategories();
      redisClient.setex("/categories", 3600, JSON.stringify(categories));
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async createCategory(req, res) {
    try {
      const { name } = req.body;
      const { error } = createCategoryValidation(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
      } else {
        const category = await Category.createCategory({ name });
        redisClient.del("/categories");
        res.status(200).json({ message: "Category created successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async updateCategory(req, res) {
    try {
      const { name } = req.body;
      const { category_id } = req.params;
      redisClient.del("/categories");
      const category = await Category.updateCategory(category_id, { name });
      res.status(200).json({ message: "Category updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async deleteCategory(req, res) {
    try {
      const { category_id } = req.params;
      const category = await Category.deleteCategory(category_id);
      redisClient.del("/categories");
      await redisClient.del("/categories");
      res.status(200).json({ message: "Category successfully deleted" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
export default CategoryController;
