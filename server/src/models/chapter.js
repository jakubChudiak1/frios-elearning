import db from "../config/db.js";

class Chapter {
  static async getSubjectsChapters(subject_id, published) {
    try {
      console.log("published", published);
      const allChapters =
        "SELECT * FROM chapters WHERE subject_id = ? AND main_chapter IS NULL";
      const publishedChapters =
        "SELECT * FROM chapters WHERE subject_id = ? AND main_chapter IS NULL AND published = TRUE";
      console.log(
        "SQL Query:",
        published === true ? publishedChapters : allChapters
      );
      const results = await db.query(
        published === "true" ? publishedChapters : allChapters,
        [subject_id]
      );
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
      const allSideChapters =
        "SELECT chapter_id,subject_id,file_id,published,name,content FROM chapters where main_chapter IS NULL AND subject_id = ?";
      const results = await db.query(query, [subject_id]);
      return results;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getSideChapters(main_chapter, published) {
    try {
      const allSideChapters =
        "SELECT chapter_id,subject_id,file_id,published,name,content,main_chapter FROM chapters WHERE main_chapter = ?";
      const publisedSideChapter =
        "SELECT chapter_id,subject_id,file_id,published,name,content,main_chapter FROM chapters WHERE main_chapter = ? AND published = TRUE";
      const results = await db.query(
        published === "true" ? publisedSideChapter : allSideChapters,
        [main_chapter]
      );
      return results;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async createMainChapter(chapter) {
    try {
      const { subject_id, name } = chapter;
      const query =
        "INSERT INTO chapters (subject_id,name,published) VALUES (?,?,TRUE)";
      const result = await db.query(query, [subject_id, name]);
      return result.insertId;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async createSideChapter(chapter) {
    try {
      const { subject_id, name, main_chapter } = chapter;
      const query =
        "INSERT INTO chapters (subject_id,name,main_chapter,published) VALUES (?,?,?,TRUE)";
      const result = await db.query(query, [subject_id, name, main_chapter]);
      return result.insertId;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateChaptersContent(chapterId, chapter) {
    try {
      const { content } = chapter;
      const query = "UPDATE chapters SET content = ? WHERE chapter_id = ?";
      const newContent = await db.query(query, [content, chapterId]);
      return newContent;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateChaptersName(chapterId, chapter) {
    try {
      const { name } = chapter;
      const query = "UPDATE chapters SET name = ? WHERE chapter_id = ?";
      const newName = await db.query(query, [name, chapterId]);
      return newName;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateChapterPublished(chapterId, chapter) {
    try {
      const { published } = chapter;
      const query =
        "UPDATE chapters SET published = ? WHERE chapter_id =? or main_chapter = ?";
      const chapterPublished = await db.query(query, [
        published,
        chapterId,
        chapterId,
      ]);
      return chapterPublished;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async deleteChapter(chapterId) {
    try {
      const query = "DELETE FROM chapters WHERE  chapter_id = ?";
      const result = await db.query(query, [chapterId]);
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default Chapter;
