import dotenv from "dotenv";
dotenv.config();

const verifyToken = (req, res, next) => {
  const session = req.session.user_id;
  if (session) {
    next();
  } else {
    res.end();
  }
};
export default verifyToken;
