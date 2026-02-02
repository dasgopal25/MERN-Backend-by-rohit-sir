const bcrypt = require("bcrypt");
const validator = require("validator");

async function Validation(data) {
//   const mandatoryInfo = ["firstName","age","emailId","mobile_no","gender","password"];
//   const isComplete = mandatoryInfo.every(k => Object.keys(data).includes(k));

//   if (!isComplete) {
//     throw new Error("Invalid fields");
//   }

  if (!validator.isStrongPassword(data.password)) {
    throw new Error("Not a strong password");
  }

  if (data.firstName.length < 3 || data.firstName.length > 20) {
    throw new Error("Firstname must be 3–20 characters");
  }

  if (!validator.isEmail(data.emailId)) {
    throw new Error("Invalid email");
  }

  if (!validator.isMobilePhone(String(data.mobile_no), "en-IN")) {
    throw new Error("Invalid phone number");
  }

  if (data.age < 14 || data.age > 70) {
    throw new Error("Age must be between 14 and 70");
  }

  data.password = await bcrypt.hash(data.password, 10);
}

module.exports = Validation;
