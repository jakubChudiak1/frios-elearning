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
            return res.status(200).json({ message: "User logged in" });
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async signOut(req, res) {
    req.session.user_id = null;
    req.session.edit_mode = null;
    res.clearCookie("Session", { path: "/" });
    req.session.save(function (err) {
      if (err) next(err);
      req.session.regenerate(function (err) {
        if (err) next(err);
        res.redirect("/");
      });
    });
  }
}
export default AuthController;
