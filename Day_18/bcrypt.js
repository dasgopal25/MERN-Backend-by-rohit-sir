const bcrypt = require("bcrypt");

const password = "Gopal6295432911@";

async function Hashing(){
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(password,salt);
   
    console.log(salt);
    console.log(hashpass);

    const isCompare = await bcrypt.compare(password,hashpass);
    console.log(isCompare);
}

Hashing();