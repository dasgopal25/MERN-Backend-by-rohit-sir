const express = require("express");
const main = require("./Database");
const User = require("./Model/users")
const app = express();
const port = 4000;


app.use(express.json());

app.get("/info",async (req,res)=>{
  try {
    const result = await User.find({});
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post("/info",async (req,res)=>{
    try {
        await User.create(req.body);
        res.status(200).send("Data add successfully insert");
    } catch (error) {
      res.status(500).send(error);  
    }
});
app.delete("/info/:id",async (req,res)=>{
    try {
       const { id } = req.params;
        await User.deleteOne({_id:id});
        res.status(200).send("Data has been deleted");
    } catch (error) {
      res.status(500).send(error);  
    }
});
app.put("/info/:id",async (req,res)=>{
    try {
         const {id}  = req.params;
        await User.updateOne({_id:id},{name:"sandi",age:21,city:"Kolkata"});
        res.status(200).send("Data has been updated");
    } catch (error) {
        res.status(500).send(error);
    }
});



main()
    .then(() => {
        console.log("DataBase connected")
        app.listen(port,(req,res)=>{
            console.log(`Server listen at port ${port}`);
        })
    })
    .catch(err => console.log(err));
