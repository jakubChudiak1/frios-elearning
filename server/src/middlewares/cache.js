import redisClient from "../config/redisClient.js";

const cacheData = async (req, res, next) => {
  redisClient.get(req.originalUrl, (error, data) => {
    if (error) {
      throw Error(error);
    }
    console.log(data);
    if (data !== null) {
      console.log("cached");
      res.send(data);
    } else {
      console.log("not cached");
      next();
    }
  });
};

export default cacheData;
