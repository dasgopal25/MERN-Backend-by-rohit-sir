const express = require('express');
const Database = require("./DB");
const vaildator =require("./util/vaild");
const User = require("./model/users");
const bcrypt =require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const cookie_parser = require("cookie-parser");
const server = express();
const port = 8080;


server.use(express.json());
server.use(cookie_parser());

server.post("/register",async(req,res)=>{
       
    try{
        await vaildator(req.body);
        await User.create(req.body);
        res.status(200).send("User Register Done");
    }
    catch(err){
        res.status(404).send("Error "+err.message)
    }
});

server.post("/login",async (req,res)=>{

    try{
         
        const data = await User.findOne({ emailId: req.body.emailId });
    if(!data){
        throw new Error("not a vaild information");
    }
     const IsAllow = await bcrypt.compare(req.body.password,data.password);
    if(!IsAllow){
        throw new Error("User not found");
    }
        const token = jsonwebtoken.sign({emailId:data.emailId,_id:data._id},"rohit@");
        res.cookie("token",token);
        res.status(200).send("Login done");

    }
    catch(err){
        res.status(500).send("Error "+err);
    }
});


server.get("/user", async (req, res) => {
  try {
    const payload1 = jsonwebtoken.verify(req.cookies.token, "rohit@");

    const userInfo = await User.findById(payload1._id);
    res.status(200).send(userInfo);
  } catch (err) {
    res.status(401).send("Error: " + err.message);
  }

});

server.post("/logout", (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send("Logout successful");
  } catch (err) {
    res.status(500).send("Logout failed");
  }
});


server.delete("/user/:id",async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
       res.status(200).send(`${req.params.id} This id Data Deleted Done`);
    }
    catch(err){
        res.status(500).send("Error ",err.message);
    }
})

server.put("/user",async(req,res)=>{
    try{
        await vaildator(req.body);
        const {id,...update} = req.body;
        await User.findByIdAndUpdate(id,update);
        res.status(200).send("Data Update Done");
    }
    catch(err){
       res.status(500).send("Error "+err.message);
    }
})

Database()
.then(()=>{
    console.log("Connect Database");
    server.listen(port,(req,res)=>{
        console.log(`Server listen at port ${port}`);
    })
})
.catch(err => console.log(err));



