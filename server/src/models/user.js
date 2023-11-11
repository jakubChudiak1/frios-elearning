import db from "../config/db.js";

class User {
  static async getUsers(user_id) {
    try {
      const query =
        "SELECT u.user_id, u.personal_number, u.email, u.name AS first_name, u.surname, r.name AS roles_name FROM users u JOIN roles r ON u.id_role = r.id_role WHERE u.user_id <> ?";
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
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getUserById(Id) {
    try {
      const query =
        "SELECT user_id,name,surname,email,id_role FROM users WHERE user_id = ?";
      const result = await db.query(query, Id);
      return result[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  static async createUser(user) {
    try {
      const { email, cryptedPassword, name, surname, id_role = 3 } = user;

      const query =
        "INSERT INTO users (email,password,name,surname,id_role) VALUES (?,?,?,?,?)";
      const result = await db.query(query, [
        email,
        cryptedPassword,
        name,
        surname,
        id_role,
      ]);
      return result.insertId;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default User;
