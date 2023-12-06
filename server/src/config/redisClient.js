import { createClient } from "redis";
const redisClient = createClient({
  port: 6379,
  host: "localhost",
});
export default redisClient;
