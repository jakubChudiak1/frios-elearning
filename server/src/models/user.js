import db from "../config/db.js";

class User {
  static async getUsers(user_id) {
    try {
      const query =
        "SELECT u.user_id,u.role_id, u.personal_number, u.email, CONCAT(u.name, ' ', u.surname) AS users_name, r.name AS roles_name FROM users u JOIN roles r ON u.role_id = r.role_id WHERE u.user_id <> ?";
      const result = await db.query(query, [user_id]);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getUserByEmail(email) {
    try {
      const query = "SELECT * FROM users WHERE email = ?";
      const result = await db.query(query, email);
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getUserById(userId) {
    try {
      const query =
        "SELECT u.user_id,u.name,u.surname,u.email,u.role_id,r.name AS role_name FROM users u LEFT JOIN roles r ON u.role_id = r.role_id WHERE user_id = ?";
      const result = await db.query(query, userId);
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getUsersByRole(roleId) {
    try {
      const query =
        "SELECT user_id,name,surname,email,role_id FROM users WHERE role_id = ?";
      const results = await db.query(query, roleId);
      return results;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async createUser(user) {
    try {
      const {
        personal_number,
        ldap_login,
        email,
        cryptedPassword,
        name,
        surname,
        role_id,
      } = user;
      const query =
        "INSERT INTO users (personal_number,ldap_login,email,password,name,surname,role_id) VALUES (?,?,?,?,?,?,?)";
      const result = await db.query(query, [
        personal_number,
        ldap_login,
        email,
        cryptedPassword,
        name,
        surname,
        role_id,
      ]);
      return result.insertId;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async changeUsersRole(userId, user) {
    try {
      const { role_id } = user;
      const query = "UPDATE users SET role_id = ? WHERE user_id = ?";
      const result = await db.query(query, [role_id, userId]);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default User;
