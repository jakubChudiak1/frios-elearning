import ldap from "ldapjs";
import dotenv from "dotenv";
dotenv.config();

const ldapClient = ldap.createClient({
  url: process.env.LDAP_URL,
  reconnect: true,
});

export default ldapClient;
