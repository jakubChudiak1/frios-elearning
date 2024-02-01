import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();
const redisClient = createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
});
export default redisClient;
