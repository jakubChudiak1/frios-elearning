import dotenv from "dotenv";
import User from "../models/user.js";
import ldap from "ldapjs";
import bcrypt from "bcryptjs";
dotenv.config();
class LdapController {
  static async signinLdap(req, res) {
    try {
      const { ldap_login, password } = req.body;
      const ldapClient = ldap.createClient({
        url: process.env.LDAP_URL,
        reconnect: true,
      });

      ldapClient.on("connect", () => {
        ldapClient.bind(
          process.env.LDAP_MAIN_DN,
          process.env.LDAP_PASSWORD,
          (bindError) => {
            if (bindError) {
              res.status(400).json({ message: "INCORRECT MAIN_DN" });
              ldapClient.unbind(() => {
                console.log("disconnecting");
              });
            } else {
              const opts = {
                filter: `uid=${ldap_login}`,
                scope: "sub",
                attributes: [
                  "distinguishedName",
                  "sn",
                  "mail",
                  "givenName",
                  "uidNumber",
                ],
              };
              ldapClient.search(
                process.env.LDAP_BASE,
                opts,
                (searchError, searchRes) => {
                  let userDn = "";
                  let userNumber = "";
                  let userEmail = "";
                  let userFirstName = "";
                  let userSurname = "";
                  let match = false;
                  if (searchError) {
                    res.status(400).json({ message: "INCORRECT CREDENTIALS" });
                    ldapClient.unbind(() => {
                      console.log("disconnecting");
                    });
                  }
                  searchRes.on("error", (err) => {
                    res.status(400).json({ message: "INCORRECT CREDENTIALS" });
                    ldapClient.unbind(() => {
                      console.log("Disconnecting.");
                    });
                  });

                  searchRes.on("searchEntry", async (entry) => {
                    userDn = entry.attributes[2].values[0];
                    userNumber = entry.attributes[4].values[0];
                    console.log(userNumber);
                    userSurname = entry.attributes[0].values[0];
                    userFirstName = entry.attributes[1].values[0];
                    userEmail = entry.attributes[3].values[0];
                    match = true;
                  });

                  searchRes.on("end", () => {
                    if (match) {
                      ldapClient.bind(userDn, password, async (authError) => {
                        if (authError) {
                          res
                            .status(400)
                            .json({ message: "INCORRECT CREDENTIALS" });
                          ldapClient.unbind(() => {
                            console.log("disconnecting");
                          });
                        } else {
                          const cryptedPassword = await bcrypt.hash(
                            password,
                            10
                          );
                          const user = await User.getUserByEmail(userEmail);
                          if (!user) {
                            const newUser = await User.createUser({
                              personal_number: userNumber,
                              ldap_login: ldap_login,
                              email: userEmail,
                              cryptedPassword: cryptedPassword,
                              name: userFirstName,
                              surname: userSurname,
                            });
                            ldapClient.unbind(() => {
                              console.log("disconnecting");
                            });
                            req.session.regenerate(function (err) {
                              const user_id = Number(newUser);
                              req.session.user_id = user_id;
                              req.session.save();
                              return res
                                .status(200)
                                .json({ message: "User logged in" });
                            });
                          } else {
                            ldapClient.unbind(() => {
                              console.log("disconnecting");
                            });
                            req.session.regenerate(function (err) {
                              const user_id = user?.user_id;
                              req.session.user_id = user_id;
                              req.session.save();
                              return res
                                .status(200)
                                .json({ message: "User logged in" });
                            });
                          }
                        }
                      });
                    } else {
                      res
                        .status(500)
                        .json({ message: "Internal Server Error" });
                      ldapClient.unbind(() => {
                        console.log("disconnecting");
                      });
                    }
                  });
                }
              );
            }
          }
        );
      });
    } catch (error) {
      res.status(400).json({ message: "Error" });
    }
  }
}
export default LdapController;
