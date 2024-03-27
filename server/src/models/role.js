import db from "../config/db.js";

class Role {
  static async getRoles() {
    try {
      const query = "SELECT * FROM roles";
      const result = await db.query(query);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getRoleByName(name) {
    try {
      const query = "SELECT * FROM roles WHERE name = ?";
      const result = await db.query(query, name);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getRolesName(id) {
    try {
      const query = "SELECT name FROM roles WHERE role_id = ?";
      const result = await db.query(query, id);
      return result[0].nazov;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async createRole(role) {
    try {
      const { name } = role;
      const query = "INSERT INTO roles (name) VALUES (?)";
      const result = await db.query(query, [name]);
      return result.insertId;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateRole(id, role) {
    try {
      const { name } = role;
      const query = "UPDATE roles SET (name) = ? WHERE role_id = (?)";
      const result = await db.query(query, [name, id]);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async deleteRole(id) {
    try {
      const query = "DELETE FROM roles WHERE role_id = ?";
      const result = await db.query(query, [id]);
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default Role;
