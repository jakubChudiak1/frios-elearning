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
import sessionMiddleware from "./middlewares/session.js";
import corsOptions from "./middlewares/cors.js";
import ldap from "ldapjs";
import User from "./models/user.js";
import bcrypt from "bcryptjs";

dotenv.config();
const app = express();
cors(corsOptions);
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(sessionMiddleware);

const ldapConfig = {
  url: "ldaps://ldappdc.fri.uniza.sk:636",
  bindDN: "",
  bindCredentials: "",
  baseDN: "DC=fri,DC=uniza,DC=sk",
};
/* 
const opts = {
  filter: "(uid=galcik3)",
  scope: "sub",
  attributes: ["distinguishedName"],
}; */
const client = ldap.createClient({
  url: ldapConfig.url,
  reconnect: true,
});

client.on("error", (error) => {
  console.log(error);
});

const mainDN =
  "CN=Jakub Chudiak,OU=2020,OU=Studenti,OU=People,DC=fri,DC=uniza,DC=sk";
const mainPass = "jakub1234";

const ldapLogin = async (uid, password) => {
  client.on("connect", () => {
    client.bind(mainDN, mainPass, (error) => {
      if (error) {
        console.log(error);
        client.unbind(() => {
          console.log("disconecting");
        });
      } else {
        const opts = {
          filter: `uid=${uid}`,
          scope: "sub",
          attributes: [
            "distinguishedName",
            "sn",
            "mail",
            "givenName",
            "uidNumber",
          ],
        };
        client.search(ldapConfig.baseDN, opts, (err, res) => {
          let userDn = "";
          let userNumber = "";
          let userEmail = "";
          let userFirstName = "";
          let userSurname = "";
          let match = false;
          if (err) {
            console.log(err);
            client.unbind(() => {
              console.log("disconecting");
            });
          } else {
            res.on("error", (err) => {
              console.error("error: " + err.message);
            });

            res.on("searchEntry", async (entry) => {
              console.log("entry", entry.attributes[4].values.join(", "));
              userDn = entry.attributes[2].values.join(", ");
              userSurname = entry.attributes[0].values.join(", ");
              userFirstName = entry.attributes[1].values.join(", ");
              userEmail = entry.attributes[3].values.join(", ");
              match = true;
              console.log(userDn);
            });
          }
          res.on("end", () => {
            if (match) {
              client.bind(userDn, password, async (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("authentificated");
                  const cryptedPassword = await bcrypt.hash(password, 10);
                  await User.createUser({
                    email: userEmail,
                    cryptedPassword: cryptedPassword,
                    name: userFirstName,
                    surname: userSurname,
                  });
                }
              });
            } else {
              console.log("User not found");

              client.unbind(() => {
                console.log("disconecting");
              });
            }
          });
        });
      }
    });
  });
};
ldapLogin("chudiak2", "jakub1234");
/* function authDN(dn, password) {
  client.bind(dn, password, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("working");
      client.search(ldapConfig.baseDN, opts, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          res.on("searchRequest", (searchRequest) => {
            console.log("searchRequest: ", searchRequest.messageId);
          });
          res.on("searchEntry", (entry) => {
            console.log("entry: " + entry.attributes[0].values);
          });
          res.on("searchReference", (referral) => {
            console.log("referral: " + referral.uris.join());
          });
          res.on("error", (err) => {
            console.error("error: " + err.message);
          });
          res.on("end", (result) => {
            console.log("status: " + result.status);
          });
        }
      });
    }
  });
}

authDN(
  "CN=Jakub Chudiak,OU=2020,OU=Studenti,OU=People,DC=fri,DC=uniza,DC=sk",
  "jakub1234"
); */

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
