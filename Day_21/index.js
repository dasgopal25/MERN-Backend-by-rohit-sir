const express = require("express");
const main = require("./DB");
const User = require("./models/users");
const cookie = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cookie());


app.get("/user", async (req, res) => {
    try {
        const payload =  jwt.verify(req.cookies.token, "rohit@");
        const getUser = await User.findById(payload._id);
        console.log(payload)
        res.status(200).send(getUser);
    }
    catch (err) {
        res.status(500).send("Error " + err);
    }
});

app.post("/user", async (req, res) => {
    try {
        const value = req.body;
         value.password = await bcrypt.hash(value.password, 10);
        await User.insertOne(req.body);
        res.status(200).send("Data Register Successfully");
    }
    catch (err) {
        res.status(500).send("Error " + err);
    }
});
app.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email:req.body.email});
        console.log(user.email);
        
        if (req.body.email === user.email) {
               const IsAllow = await bcrypt.compare(req.body.password,user.password);
               console.log(IsAllow);
               
                if(!IsAllow){
                    throw new Error("User not found");
                }

            const token = jwt.sign({email:user.email,fullname:user.fullname,_id:user._id}, "rohit@");
            res.cookie("token", token);
            res.status(200).send("Login Done");
        } else {
            throw new Error("User not exits");
        }
    }
    catch (err) {
        res.status(500).send("Error " + err);
    }
});




main()
    .then(() => {
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log(`App listen at port ${PORT}`);
        })
    })
    .catch(err => console.log(err));