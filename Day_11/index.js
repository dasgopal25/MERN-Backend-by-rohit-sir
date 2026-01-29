const express = require("express");
const app = express();
const port = 4000;

app.use(express.json());




app.listen(port,(req,res)=>{
    console.log(`Server listen at port ${port}`);
})