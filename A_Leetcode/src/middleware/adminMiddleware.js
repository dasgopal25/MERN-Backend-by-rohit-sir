const JWT = require('jsonwebtoken');
const User = require('../models/user');
const redisclient = require('../config/redis');

const adminMiddle = async (req, res, next) => {

  try {
    const { token } = req.cookies;
    if (!token)
      throw new Error("Cookie not present");

    const payload = JWT.verify(token, process.env.JWT_KEY);
    const { _id } = payload;
    if (!_id)
      throw new Error("Id is missing");

    const result = await User.findById(_id);
    if (!result)
      throw new Error("User Doesn't exist");
    
    const IsBlocked = await redisclient.exists(`token:${token}`);

    if (IsBlocked)
      throw new Error("Invaild Token");

    req.result = result;

    if(req.result.role !== 'admin')
            throw new Error("Invaild token");
    next();

  }
  catch (err) {
    res.status(401).send("Error: " + err.message);
  }
}

module.exports = adminMiddle;