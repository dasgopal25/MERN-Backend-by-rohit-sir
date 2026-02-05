const validator = require("validator");
const User = require("../model/user_model");

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

module.exports = {registerV,loginV};
