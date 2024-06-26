import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import rolesRoutes from "./routes/role.js";
import subjectsRoutes from "./routes/subjects.js";
import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import accessesRoutes from "./routes/accesses.js";
import categoriesRoutes from "./routes/categories.js";
import chaptersRoutes from "./routes/chapters.js";
import filesRoutes from "./routes/files.js";
import ldapRoutes from "./routes/ldap.js";
import editRoutes from "./routes/editMode.js";
import languageRoutes from "./routes/languages.js";
import translationsRoutes from "./routes/translations.js";
import sessionMiddleware from "./middlewares/session.js";
import corsOptions from "./middlewares/cors.js";
import i18n from "i18n";

dotenv.config();

const app = express();
app.set("trust proxy", 1);
app.use(cors(corsOptions));
app.use(i18n.init);
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
app.use("/ldap", ldapRoutes);
app.use("/edit-mode", editRoutes);
app.use("/translations", translationsRoutes);
app.use("/languages", languageRoutes);

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
