import ldap from "ldapjs";
import dotenv from "dotenv";
dotenv.config();

const ldapClient = ldap.createClient({
  url: "ldaps://ldappdc.fri.uniza.sk:636",
  reconnect: true,
});

export default ldapClient;
