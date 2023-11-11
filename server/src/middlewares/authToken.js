import cookieSession from "cookie-session";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const verifyToken = (req, res, next) => {
  const session = req.session.token;

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = session;
  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Bad token" });
    }
    req.token = token;
    req.user_id = decoded.user_id;
    req.name = decoded.name;
    req.id_role = decoded.id_role;
    next();
  });
};
export default verifyToken;
