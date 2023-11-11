import Category from "../models/category.js";

class CategoryController {
  static async getCategories(req, res) {
    try {
      const categories = await Category.getCategories();
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
