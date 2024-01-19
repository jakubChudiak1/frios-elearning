import redisClient from "../config/redisClient.js";

const cacheData = async (req, res, next) => {
  const cachedData = await redisClient.get(req.originalUrl);
  if (cachedData) {
    res.json(JSON.parse(cachedData));
  } else {
    next();
  }
};

export default cacheData;
