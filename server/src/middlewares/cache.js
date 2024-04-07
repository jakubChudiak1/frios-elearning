import redisClient from "../config/redisClient.js";

const cacheData = async (req, res, next) => {
  redisClient.get(req.originalUrl, (error, data) => {
    if (error) {
      throw Error(error);
    }
    console.log(data);
    if (data !== null) {
      res.send(data);
    } else {
      next();
    }
  });
};

export default cacheData;
