import redisClient from "../config/redisClient.js";

const cacheData = async (req, res, next) => {
  const cachedData = await redisClient.get(req.originalUrl);
  if (cachedData) {
    console.log("cached");
    res.json(JSON.parse(cachedData));
  } else {
    console.log("not cached");
    next();
  }
};

export default cacheData;
