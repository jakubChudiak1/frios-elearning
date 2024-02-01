import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import rolesRoutes from "./routes/role.js";
import subjectsRoutes from "./routes/subjects.js";
import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import accessesRoutes from "./routes/accesses.js";
import categoriesRoutes from "./routes/categories.js";
import chaptersRoutes from "./routes/chapters.js";
import filesRoutes from "./routes/files.js";
import sessionMiddleware from "./middlewares/session.js";
import corsOptions from "./middlewares/cors.js";

dotenv.config();
const app = express();
cors(corsOptions);
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(sessionMiddleware);

app.use("/roles", rolesRoutes);
app.use("/categories", categoriesRoutes);
app.use("/subjects", subjectsRoutes);
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/accesses", accessesRoutes);
app.use("/chapters", chaptersRoutes);
app.use("/files", filesRoutes);

app.listen(process.env.PORT, "127.0.0.1", () => {
  console.log("server is running");
});
