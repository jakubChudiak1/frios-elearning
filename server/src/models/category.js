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
}
export default Category;
