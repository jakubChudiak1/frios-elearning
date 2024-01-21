import db from "../config/db.js";

class Files {
  static async getFiles() {
    try {
      const query = "SELECT * FROM files";
      const results = await db.query(query);
      return results;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getFileById(fileId) {
    try {
      const query = "SELECT * FROM files WHERE file_id = ?";
      const result = await db.query(query, [fileId]);
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  static async createFile(file) {
    try {
      const { path } = file;
      const query = "INSERT INTO files (path) VALUES (?)";
      const result = await db.query(query, [path]);
      return result.insertId;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async deleteFile(fileId) {
    try {
      const query = "DELETE FROM files WHERE file_id = ?";
      const result = await db.query(query, fileId);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default Files;
