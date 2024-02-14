import express from "express";
import LdapController from "../controllers/ldapController.js";

const router = express.Router();

router.post("/signin", LdapController.signinLdap);
export default router;
