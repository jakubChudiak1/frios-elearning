import User from "../models/user.js";
import Role from "../models/role.js";
import createUserValidation from "../validations/validateCreateUser.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class AuthController {
  static async isValid(req, res) {
    try {
      const user_id = req.user_id;
      const name = req.name;
      const id_role = req.id_role;
      res.status(200).json({ user_id, name, id_role });
    } catch (error) {
      console.log(error);
    }
  }

  static async signUp(req, res) {
    try {
      const { email, password, name, surname, id_role } = req.body;
      const { error } = createUserValidation({
        email,
        password,
        name,
        surname,
      });
      const cryptedPassword = await bcrypt.hash(password, 10);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
      } else {
        await User.createUser({
          email,
          cryptedPassword,
          name,
          surname,
          id_role,
        });
        res.status(201).json({ message: "User created successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      if (req.session.token) {
        return res.status(403).json({ message: "User is already signed in" });
      }

      const existingUser = await User.getUserByEmail(email);
      if (!existingUser || existingUser.length === 0) {
        return res.status(400).json({ message: "User not found" });
      } else {
        const matchPassword = await bcrypt.compare(
          password,
          existingUser[0].password
        );
        if (!matchPassword) {
          return res.status(400).json({ message: "Incorrect Credentials" });
        } else {
          const roleName = await Role.getRolesName(existingUser[0].id_role);
          const userResponse = {
            id: existingUser[0].user_id,
            name: existingUser[0].name,
            role: roleName,
          };
          const token = jwt.sign(
            {
              user_id: existingUser[0].user_id,
              name: existingUser[0].name,
              id_role: existingUser[0].id_role,
            },

            process.env.SECRET_KEY,
            {
              expiresIn: "8h",
            }
          );
          const user_id = existingUser[0].user_id;
          req.session.user_id = user_id;
          req.session.token = token;
          return res.status(200).json({ user: userResponse });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async signOut(req, res) {
    try {
      req.session = null;
      return res.status(200).json({ message: "Sign-out successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
export default AuthController;
