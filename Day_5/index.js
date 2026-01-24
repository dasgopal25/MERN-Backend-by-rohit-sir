const express = require("express");

const app = express();
 
app.arguments((req,res)=>{
    res.send("Hii gopal")
})

app.listen(4000,()=>{
    console.log("Listening at port 4000");
})