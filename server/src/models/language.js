import db from "../config/db.js";

class Language {
  static async getLanguages() {
    try {
      const query = "SELECT * FROM languages";
      const results = await db.query(query);
      return results;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default Language;
