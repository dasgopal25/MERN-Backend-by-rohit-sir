// const http =require('http');

// const server =http.createServer((req,res)=>{

//  if(req.url === "/"){
//     res.end("Hello Gopal Das");
//  }
//  else if(req.url === "/contact"){
//  res.end("This is our contact page");
//  }
//  else if(req.url === "/about"){
//  res.end("This is our about page");
//  }
//  else{
//  res.end("page is not found!");
//  }


    
// });

// server.listen(4000,()=>{
//     console.log("I am listen at port 4000");
    
// })

const express = require("express");

const app = express();
 
app.use((req,res)=>{
    res.send("Hii gopal")
})

app.listen(4000,()=>{
    console.log("Listening at port 4000");
})