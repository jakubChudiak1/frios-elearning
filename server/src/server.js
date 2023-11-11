import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import rolesRoutes from "./routes/role.js";
import subjectsRoutes from "./routes/subjects.js";
import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import accessesRoutes from "./routes/accesses.js";
import categoriesRoutes from "./routes/categories.js";
import chaptersRoutes from "./routes/chapters.js";

dotenv.config();
const app = express();
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(
  cookieSession({
    name: "Session",
    secret: process.env.SECRET_KEY,
    httpOnly: true,
  })
);

app.use("/roles", rolesRoutes);
app.use("/categories", categoriesRoutes);
app.use("/subjects", subjectsRoutes);
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/accesses", accessesRoutes);
app.use("/chapters", chaptersRoutes);

app.listen(process.env.PORT, "127.0.0.1", () => {
  console.log("server is running");
});
