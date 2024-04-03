import session from "express-session";
import RedisStore from "connect-redis";
import { v4 as gennuid } from "uuid";
import redisClient from "../config/redisClient.js";

const redisStore = new RedisStore({
  prefix: "elearning:",
  client: redisClient,
});

const sessionMiddleware = session({
  name: "Session",
  genid: function (req) {
    return gennuid();
  },
  secret: process.env.SECRET_KEY,
  httpOnly: true,
  store: redisStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 1 * 1000 * 60 * 60 * 24 * 14,
    sameSite: "none",
  },
  proxy: true,
});

export default sessionMiddleware;
