const User = require("../model/user_model");
const {registerV,loginV} = require("../middleware/user_middle");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registPost = async (req, res) => {
  try {
    await registerV(req.body);
    req.body.password = await bcrypt.hash(req.body.password, 10);
    await User.create(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully"
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};


const loginPost = async (req,res) =>{
  try{
   loginV(req.body);
   const people = await User.findOne({email:req.body.email});
   if(!people){
    throw new Error("User not find");
   }
  const IsAllow = await bcrypt.compare(req.body.password,people.password);
      if(!IsAllow){
          throw new Error("User not found");
      }
     const token = jwt.sign({email:req.body.email},process.env.SECRET_CODE);
         res.cookie("token", token, {
  expires: new Date(Date.now() + 3*24*60*60*1000)
});
          res.status(200).send("Login done");
  }
  catch(err){
    res.status(500).send("Error "+err.message);
  }
 
}

const logoutPost = async (req,res) =>{
  try {

    res.clearCookie("token", {
    httpOnly: true,
    secure: true,   // production
    sameSite: "strict"
  });

  res.status(200).send("Logout done");
  } catch (error) {
    res.status(404).send("Error "+error.message);
  }
}

const profileGet = async (req,res) =>{
  try {
      const payload = jwt.verify(req.cookies.token,process.env.SECRET_CODE);
  
      const userInfo = await User.findOne({email:payload.email});
      res.status(200).send(userInfo);
    } catch (err) {
      res.status(401).send("Error: " + err.message);
    }
}

module.exports = { registPost,loginPost,logoutPost,profileGet};
