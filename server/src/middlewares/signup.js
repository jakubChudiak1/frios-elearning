import User from "../models/user.js";

const checkDuplicateEmail = async (req, res, next) => {
  try {
    const user = await User.getUserByEmail(req.body.email);
    if (user.length != 0) {
      res.status(400).send({
        message: "Email is already used",
      });
      return;
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
export default checkDuplicateEmail;
