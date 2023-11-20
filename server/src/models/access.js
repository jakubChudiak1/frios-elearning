import db from "../config/db.js";

class Access {
  static async getAccesses() {
    try {
      const query =
        "SELECT u.name,u.surname,a.access_id,a.status,a.created_at,s.name AS subjects_name FROM accesses a LEFT JOIN subjects s ON a.subject_id = s.subject_id LEFT JOIN users u ON a.user_id = u.user_id";
      const result = await db.query(query);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAccessById(id) {
    try {
      const query = "SELECT * FROM accesses WHERE access_id = ?";
      const result = await db.query(query, id);
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAccessByUserId(userId) {
    try {
      const query = "SELECT * FROM accesses WHERE user_id = ?";
      const result = await db.query(query, userId);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getUsersAccessedSubjects(userId) {
    try {
      const query =
        "SELECT s.subject_id,s.subject_code, s.name, s.is_public,s.image_path, CONCAT(u.name, ' ', u.surname) AS creators_name,CAST(COUNT(c.chapter_id) AS CHAR) AS chapter_count FROM subjects s LEFT JOIN chapters c ON s.subject_id = c.subject_id LEFT JOIN users u ON s.user_id = u.user_id LEFT JOIN accesses a on s.subject_id = a.subject_id WHERE a.user_Id = ? and a.status = 'accepted' GROUP BY s.subject_id, s.subject_code, s.name, s.is_public,s.image_path ORDER BY s.subject_id";
      const results = await db.query(query, [userId]);
      return results;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAccessedSubjectByUser(subjectId, userId) {
    try {
      const query =
        "SELECT * FROM accesses WHERE subject_id = ? AND user_id = ? and status = 'accepted'";
      const results = await db.query(query, [subjectId, userId]);
      return results[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAccessBySubjectId(subjectId) {
    try {
      const query = "SELECT * FROM accesses WHERE subject_id = ?";
      const result = await db.query(query, subjectId);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAccessStatus(userId, subjectId) {
    try {
      const query =
        "SELECT status FROM accesses WHERE user_id = ? AND subject_id = ? ";
      const result = await db.query(query, [userId, subjectId]);
      return result[0];
    } catch (error) {}
  }

  static async createAccess(access) {
    try {
      const { user_id, subject_id, editable, status, created_at } = access;
      const query =
        "INSERT INTO accesses (user_id, subject_id, editable,status, created_at) VALUES (?, ?, ?, ?,?)";
      const result = await db.query(query, [
        user_id,
        subject_id,
        editable,
        status,
        created_at,
      ]);
      return result.insertId;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateStatus(access_id, access) {
    try {
      const { status } = access;
      const query = "UPDATE accesses SET status = ? WHERE access_id = ?";
      const result = await db.query(query, [status, access_id]);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async acceptStatus(access_id) {
    try {
      const query =
        "UPDATE accesses SET status = 'accepted' WHERE access_id = ?";
      const result = await db.query(query, [access_id]);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async rejectStatus(access_id) {
    try {
      const query =
        "UPDATE accesses SET status = 'rejected' WHERE access_id = ?";
      const result = await db.query(query, [access_id]);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async deleteAccess(id) {
    try {
      const query = "DELETE FROM access WHERE access_id = ?";
      const result = await db.query(query, id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default Access;
