const User = require("../model/user_model");
const {registerV,loginV} = require("../middleware/user_middle");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const RedisClient = require("../util/redis")


const registPost = async (req, res) => {
  try {
    const data = await User.findOne({email:req.body.email});
    if(data){
      throw new Error("Your provided data already register");
    }
    await registerV(req.body);
    req.body.password = await bcrypt.hash(req.body.password, 10);
    await User.create(req.body);

    res.status(201).send("User registered successfully");
  } catch (err) {
    res.status(400).send("Error: "+err.message);
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
     const token = jwt.sign({email:req.body.email},process.env.SECRET_CODE,{ expiresIn: "1m" });
     res.cookie("token", token, {expires: new Date(Date.now() + 60000)});
          res.status(200).send("Login done");
  }
  catch(err){
    res.status(500).send("Error "+err.message);
  }
 
}

const logoutPost = async (req,res) =>{
  try {
    const {token} = req.cookies;
    const payload = jwt.decode(token);

    const IsBlocked =  await RedisClient.exists(`token:${token}`);
    if(IsBlocked) throw new Error("Error: invalid cookies");
   
    await RedisClient.set(`token:${token}`,"Blocked");
    await RedisClient.expireAt(`token:${token}`,payload.exp);

    res.cookie("token",null,{expires:new Date(Date.now())});

  res.status(200).send("Logout done");
  } catch (error) {
    res.status(404).send("Error "+error.message);
  }
}

const profileGet = async (req,res) =>{
  try {
    const {token} = req.cookies;
    const IsBlocked =  await RedisClient.exists(`token:${token}`);
    if(IsBlocked) throw new Error("Error: invalid cookies");
      const payload = jwt.verify(req.cookies.token,process.env.SECRET_CODE);
  
      const userInfo = await User.findOne({email:payload.email});
      if(!userInfo){
        console.log(payload.email+ " THIS GMAIL NOT EXITS");
        throw new Error("User profile already deleted");
      }
      res.status(200).send(userInfo);
    } catch (err) {
      res.status(401).send("Error: " + err.message);
    }
}

const userDelete = async(req,res)=>{
  try{
    const {token} = req.cookies;
    const IsBlocked =  await RedisClient.exists(`token:${token}`);
    if(IsBlocked) throw new Error("Error: invalid cookies");
     const payload = jwt.verify(req.cookies.token,process.env.SECRET_CODE);
  await User.deleteOne({email:payload.email});
  res.status(200).send("User has been deleted done!");
  }
  catch(err){
     res.status(404).send("Error "+err.message);
  }
}

const userUpdate = async (req,res)=>{
  try{
    const {token} = req.cookies;
    const IsBlocked =  await RedisClient.exists(`token:${token}`);
    if(IsBlocked) throw new Error("Error: invalid cookies");
    const payload = jwt.verify(req.cookies.token,process.env.SECRET_CODE);
    const user = await User.findOne({email:payload.email});
    
    if(!user){
      throw new Error("User not Exits");
    }
    if(req.body.fullname === user.fullname){
      throw new Error("You are Enter same name");
    }
    if(req.body.gender === user.gender){
      throw new Error("You are enter same gender");
    }
    
    await User.updateOne({email:user.email},{$set:{fullname:req.body.fullname,gender:req.body.gender}});
    res.status(200).send("Update successfully");
  }
  catch(err){
    res.status(404).send("Error "+err.message);
  }
}

module.exports = { registPost,loginPost,logoutPost,profileGet,userDelete,userUpdate};
