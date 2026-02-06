const validator = require('validator');

function validation(data) {
    try {
        const mandatoryField = ["firstName", "email", "password"];
        const IsAllow = mandatoryField.every((k) => Object.keys(data).includes(k));

        if (!IsAllow)
            throw new Error("Some Field Missing");

        if(!validator.isEmail(data.email))
            throw new Error("Invaild Email");
         
        if(!validator.isStrongPassword(data.password))
            throw new Error("Week Password");
    }
    catch (err) {
        console.log("1Erorr: " + err);
    }
}

module.exports = validation;