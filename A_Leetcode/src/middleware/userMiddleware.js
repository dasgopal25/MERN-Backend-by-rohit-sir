const JWT = require('jsonwebtoken');
const User = require('../models/user');
const redisclient = require('../config/redis');

const userMiddle = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token)
      return res.status(401).send("Cookie not present");

    const payload = JWT.verify(token, process.env.JWT_KEY);
    const { _id } = payload;
    if (!_id)
      return res.status(401).send("Id is missing");

    const result = await User.findById(_id);
    if (!result)
      return res.status(401).send("User doesn't exist");

    const isBlocked = await redisclient.exists(`token:${token}`);
    if (isBlocked)
      return res.status(401).send("Invalid Token");

    req.result = result;
    return next(); 

  } catch (err) {
    return res.status(401).send("Error: " + err.message);
  }
};

module.exports = userMiddle;