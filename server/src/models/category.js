import db from "../config/db.js";

class Category {
  static async getCategories() {
    try {
      const query = "SELECT * FROM categories";
      const results = await db.query(query);
      return results;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async createCategory(category) {
    try {
      const { name } = category;
      const query = "INSERT INTO categories (name) values (?)";
      const result = await db.query(query, [name]);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateCategory(categoryId, category) {
    try {
      const { name } = category;
      const query = "UPDATE categories SET name = (?) WHERE category_id = (?)";
      const result = await db.query(query, [name, categoryId]);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async deleteCategory(categoryId) {
    try {
      const query = "DELETE FROM categories WHERE category_id = (?)";
      const result = await db.query(query, [categoryId]);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default Category;
