import User from "../models/user.js";

const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.getUserById(req.session.user_id);
      if (roles.includes(user.role_id)) {
        next();
      } else {
        res.status(400).json({ message: "Access Denied" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

export default checkRole;
