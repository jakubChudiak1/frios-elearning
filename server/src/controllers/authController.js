import User from "../models/user.js";
import createUserValidation from "../validations/validateCreateUser.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

class AuthController {
  static async isValid(req, res) {
    try {
      const user_id = req.session.user_id;
      const user = await User.getUserById(user_id);
      const editMode = req.session.edit_mode;
      res.status(200).json({ ...user, edit_mode: editMode });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      if (req.session.user_id) {
        return res.status(400).json({ message: "User is already signed in" });
      }
      const existingUser = await User.getUserByEmail(email);
      if (!existingUser || existingUser.length === 0) {
        return res.status(400).json({ message: "Incorrect Credentials" });
      } else {
        const matchPasword = await bcrypt.compare(
          password,
          existingUser?.password
        );
        if (!matchPasword) {
          return res.status(400).json({ message: "Incorrect Credentials" });
        } else {
          req.session.regenerate(function (err) {
            const user_id = existingUser?.user_id;
            req.session.user_id = user_id;
            req.session.edit_mode = false;
            req.session.save();
            return res
              .status(200)
              .json({ message: req.session, id: req.sessionID });
          });
        }
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async signUp(req, res) {
    try {
      const { email, password, name, surname, role_id } = req.body;
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
        const newUser = await User.createUser({
          email,
          cryptedPassword,
          name,
          surname,
          role_id: 3,
        });
        req.session.regenerate(function (err) {
          const user_id = Number(newUser);
          req.session.user_id = user_id;
          req.session.save();
          return res.status(200).json({ message: "User logged in" });
        });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async signOut(req, res) {
    req.session.user_id = null;
    req.session.edit_mode = null;
    res.clearCookie("Session", { path: "/" });
    req.session.save(function (err) {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
      }
      req.session.regenerate(function (err) {
        if (err) {
          res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(200).json({ message: "Sign-out successful" });
      });
    });
  }
}
export default AuthController;
