const express = require("express");
 const app = express();
const port = 4000;

 app.use(express.json());
 
app.get("/user",(req,res)=>{
    res.send({name:"Gopal"})
})

app.post("/user",(req,res)=>{
    console.log(req.body);
    res.send("Data Save Sucessfully");
})


 app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
 })