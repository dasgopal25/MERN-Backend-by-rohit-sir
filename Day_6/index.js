const express = require("express");

const app = express();
 


app.use("/about/:id/:user",(req,res)=>{
    console.log(req.params);
    
    res.send("Hii gopal,gopal")
})

// app.use("/",(req,res)=>{
//     res.send("Hii")
// })

app.listen(4000,()=>{
    console.log("Listening at port 4000");
})