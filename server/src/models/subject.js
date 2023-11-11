import db from "../config/db.js";

class Subject {
  static async getSubjects() {
    try {
      const query =
        "SELECT s.subject_id,s.subject_code, s.name, s.is_public,s.image_path, CONCAT(u.name, ' ', u.surname) AS creators_name,CAST(COUNT(c.chapter_id) AS CHAR) AS chapter_count FROM subjects s LEFT JOIN chapters c ON s.subject_id = c.subject_id LEFT JOIN users u ON s.user_id = u.user_id GROUP BY s.subject_id, s.subject_code, s.name, s.is_public,s.image_path ORDER BY s.subject_id";
      const result = await db.query(query);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getSubjectsByStatus(isPublic) {
    try {
      const query =
        "SELECT s.subject_id,s.subject_code, s.name, s.is_public,s.image_path, CONCAT(u.name, ' ', u.surname) AS creators_name,CAST(COUNT(c.chapter_id) AS CHAR) AS chapter_count FROM subjects s LEFT JOIN chapters c ON s.subject_id = c.subject_id LEFT JOIN users u ON s.user_id = u.user_id WHERE s.is_public = ? GROUP BY s.subject_id, s.subject_code, s.name, s.is_public,s.image_path ORDER BY s.subject_id";
      const result = await db.query(query, [isPublic]);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getSubjectByName(name) {
    try {
      const query = "SELECT * FROM subjects WHERE name = ?";
      const result = await db.query(query, [name]);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getSubjectById(id) {
    try {
      const query =
        "SELECT s.subject_id,s.subject_code, s.name,ca.name as category_name, s.is_public,s.image_path, CONCAT(u.name, ' ', u.surname) AS creators_name,CAST(COUNT(c.chapter_id) AS CHAR) AS chapter_count,s.backdrop_path,s.description,s.user_id FROM subjects s LEFT JOIN chapters c ON s.subject_id = c.subject_id LEFT JOIN users u ON s.user_id = u.user_id LEFT JOIN categories ca ON s.category_id = ca.category_id WHERE s.subject_id = ? GROUP BY s.subject_id, s.subject_code, s.name, s.is_public,s.image_path ORDER BY s.subject_id";
      const result = await db.query(query, [id]);
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getSubjectsByString(str) {
    try {
      const query =
        "SELECT s.subject_id,s.subject_code, s.name, s.is_public,s.image_path,CONCAT(u.name, ' ', u.surname) AS creators_name,CAST(COUNT(c.chapter_id) AS CHAR) AS chapter_count FROM subjects s LEFT JOIN chapters c ON s.subject_id = c.subject_id LEFT JOIN users u ON s.user_id = u.user_id WHERE s.name LIKE ? GROUP BY s.subject_id, s.subject_code, s.name, s.is_public,s.image_path ORDER BY s.subject_id";
      const results = await db.query(query, [`%${str}%`]);
      return results;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getSubjectsByCreator(user_id, subject_id) {
    try {
      const query =
        "SELECT s.subject_id,s.subject_code, s.name, s.is_public,s.image_path, CONCAT(u.name, ' ', u.surname) AS creators_name,CAST(COUNT(c.chapter_id) AS CHAR) AS chapter_count FROM subjects s LEFT JOIN chapters c ON s.subject_id = c.subject_id LEFT JOIN users u ON s.user_id = u.user_id WHERE s.user_id = ? AND s.subject_id <> ? GROUP BY s.subject_id, s.subject_code, s.name, s.is_public,s.image_path ORDER BY s.subject_id";
      const results = await db.query(query, [user_id, subject_id]);
      return results;
    } catch (error) {
      throw new Error();
    }
  }

  static async getSubjectsByCategory(category_name) {
    try {
      const query =
        "SELECT s.subject_id,ca.name as category_name,s.subject_code, s.name, s.is_public,s.image_path, CONCAT(u.name, ' ', u.surname) AS creators_name,CAST(COUNT(c.chapter_id) AS CHAR) AS chapter_count FROM subjects s LEFT JOIN chapters c ON s.subject_id = c.subject_id LEFT JOIN users u ON s.user_id = u.user_id LEFT JOIN categories ca ON s.category_id = ca.category_id WHERE ca.name = ? GROUP BY s.subject_id, s.subject_code, s.name, s.is_public,s.image_path ORDER BY s.subject_id";
      const results = await db.query(query, [category_name]);
      return results;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getRecommendedSubjects(category_name, subject_id) {
    try {
      const query =
        "SELECT s.subject_id,ca.name as category_name,s.subject_code, s.name, s.is_public,s.image_path, CONCAT(u.name, ' ', u.surname) AS creators_name,CAST(COUNT(c.chapter_id) AS CHAR) AS chapter_count FROM subjects s LEFT JOIN chapters c ON s.subject_id = c.subject_id LEFT JOIN users u ON s.user_id = u.user_id LEFT JOIN categories ca ON s.category_id = ca.category_id WHERE ca.name = ? AND s.subject_id <> ? GROUP BY s.subject_id, s.subject_code, s.name, s.is_public,s.image_path ORDER BY s.subject_id";
      const results = await db.query(query, [category_name, subject_id]);
      return results;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async createSubject(subject) {
    try {
      const {
        category_id,
        user_id,
        subject_code,
        name,
        is_public,
        image_path,
      } = subject;
      const query =
        "INSERT INTO subjects (category_id,user_id,subject_code,name,is_public,image_path) VALUES (?,?,?,?,?,?)";
      const result = await db.query(query, [
        category_id,
        user_id,
        subject_code,
        name,
        is_public,
        image_path,
      ]);
      return result.insertId;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateSubject(id, subject) {
    try {
      const { subject_code, name, is_public } = subject;
      const query =
        "UPDATE subjects SET subject_code = ?, name = ?, is_public = ? WHERE is_public = ?";
      const result = await db.query(query, [subject_code, name, is_public, id]);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async deleteSubject(id) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
      await connection.query("DELETE FROM accesses WHERE subject_id = ?", [id]);
      await connection.query(
        "DELETE FROM chapters WHERE subject_id = ? AND main_chapter IS NOT NULL",
        [id]
      );
      await connection.query(
        "DELETE FROM chapters WHERE subject_id = ? AND main_chapter IS NULL",
        [id]
      );
      await connection.query("DELETE FROM subjects WHERE subject_id = ?", [id]);
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw new Error(error);
    } finally {
      connection.release();
    }
  }
}
export default Subject;
