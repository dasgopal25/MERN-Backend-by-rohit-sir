const express = require("express");
const app = express();
const port = 4000


app.use("/user",(req,res,next)=>{
  console.log(`${new Date().toLocaleTimeString("en-IN")},
, ${req.method},${req.url}`);
next();

});

app.get("/user",(req,res)=>{
   res.send("Hi get method");
})
app.post("/user",(req,res)=>{
      res.send("Hi post method");
})
app.delete("/user",(req,res)=>{
      res.send("Hi delete method");

})


app.listen(port,(res,req)=>{
     console.log(`Server listen at ${port}`);
});
