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
      res.status(200).json({ message: "Category created successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateCategory(req, res) {
    try {
      const { name } = req.body;
      const { category_id } = req.params;
      const category = await Category.updateCategory(category_id, { name });
      res.status(200).json({ message: "Category updated successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteCategory(req, res) {
    try {
      const { category_id } = req.params;
      console.log(category_id);
      const category = await Category.deleteCategory(category_id);
      res.status(200).json({ message: "Category successfully deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}
export default CategoryController;
