const validator = require("validator");
const User = require("../model/user_model");
const RedisClient = require("../util/redis");

async function registerV(data) {
  const mandatoryInfo = ["fullname", "email", "gender", "password"];

  const isComplete = mandatoryInfo.every(k =>
    Object.keys(data).includes(k)
  );

  if (!isComplete) {
    throw new Error("Missing required fields");
  }

  if(!(data.fullname.length>=3 && data.fullname.length<=30)){
    throw new Error("min 3 letter and max 30 letter");
  }

  if (!validator.isEmail(data.email)) {
    throw new Error("Invalid email");
  }

  if (!validator.isStrongPassword(data.password)) {
    throw new Error("Password not strong enough");
  }
}

async function loginV(data) {
try{
const mandatoryInfo = ["email","password"]
const isComplete = mandatoryInfo.every(k =>
    Object.keys(data).includes(k)
  );
  if(!isComplete){
    throw new Error("Invalid");
  }
}catch(err){
  return new Error("Error "+err.message);
}
  

}

const rateLimiter = async (req,res,next) => {
  try {
    const ip = req.ip;
    const count = await RedisClient.incr(ip);

    if(count>60){
      throw new Error("User Limit Exceeded");
    }

    if(count == 1){
      await RedisClient.expire(3600);
    }

    next();

  } catch (error) {
    res.status(404).send(error.message);
  }
}


module.exports = {registerV,loginV,rateLimiter};
