import db from "../config/db.js";

class Chapter {
  static async getSubjectsChapters(subject_id) {
    try {
      const query =
        "SELECT * FROM chapters WHERE subject_id = ? AND main_chapter IS NULL";
      const results = await db.query(query, [subject_id]);
      return results;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getChaptersContent(subject_id, chapter_id) {
    try {
      const query =
        "SELECT * FROM chapters WHERE subject_id = ? AND chapter_id = ?";
      const results = await db.query(query, [subject_id, chapter_id]);
      return results[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getMainChapters(subject_id) {
    try {
      const query =
        "SELECT chapter_id,subject_id,file_id,name,content,published FROM chapters where main_chapter IS NULL AND subject_id = ?";
      const results = await db.query(query, [subject_id]);
      return results;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getSideChapters(main_chapter) {
    try {
      const query =
        "SELECT chapter_id,subject_id,file_id,name,content,published,main_chapter FROM chapters WHERE main_chapter = ?";
      const results = await db.query(query, [main_chapter]);
      return results;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default Chapter;
