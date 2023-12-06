import User from "../models/user.js";
import Role from "../models/role.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class UserController {
  static async getUsers(req, res) {
    try {
      const user_id = req.session.user_id;
      const users = await User.getUsers(user_id);
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserByEmail(req, res) {
    try {
      const { email } = req.params;
      const user = await User.getUserByEmail(email);
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  }

  static async getUsersInfo(req, res) {
    try {
      const user_id = req.session.user_id;
      const user = await User.getUserById(user_id);
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
export default UserController;
