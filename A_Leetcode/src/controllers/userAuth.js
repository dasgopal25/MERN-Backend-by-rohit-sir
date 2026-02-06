const redisclient = require('../config/redis');
const User = require('../models/user')
const validation = require('../validator/userAuthen');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        //validation code
        validation(req.body);

        const { firstName, email, password } = req.body;

        req.body.password = await bcrypt.hash(password, 10);
        req.body.role = "user";
        const user = await User.create(req.body);

        const token = JWT.sign({ _id: user._id, email: user.email,role:user.role }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
        res.cookie('token', token, { maxAge: 60 * 60 * 1000 });

        res.status(201).send("User register successfully");

    }
    catch (err) {
        res.status(400).send("2Error: " + err.message);
    }
}

const adminRegister = async (req,res) =>{
     try {
        //validation code
        validation(req.body);

        const { firstName, email, password } = req.body;

        req.body.password = await bcrypt.hash(password, 10);
        const user = await User.create(req.body);

        const token = JWT.sign({ _id: user._id, email: user.email,role:user.role }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
        res.cookie('token', token, { maxAge: 60 * 60 * 1000 });

        res.status(201).send("User register successfully");

    }
    catch (err) {
        res.status(400).send("2Error: " + err.message);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            throw new Error("Invaild Credentiral");

        const user = await User.findOne({ email });

        const match = bcrypt.compare(password, user.password);

        if (!match)
            throw new Error("Invaild Credentiral")

         const token = JWT.sign({ _id: user._id, email: user.email,role:user.role}, process.env.JWT_KEY, { expiresIn: 60 * 60 });
        res.cookie('token', token, { maxAge: 60 * 60 * 1000 });

        res.status(200).send("Login successfully");
    }
    catch (err) {
        res.status(401).send("Login fail!:- " + err.message);
    }


}

const logout = async (req,res)=>{
 try{
    const {token} = req.cookies;
    const payload = JWT.decode(token);
    await redisclient.set(`token:${token}`,"Blocked");
    await redisclient.expireAt(`token:${token}`,payload.exp);
    //res.cookie("token",null,new Date(Date.now()));
     res.clearCookie("token");
    // res.cookie("token", "", { expires: new Date(0) });

    res.status(200).send("Logged Out SuccessFully");
 }
 catch(err){
    res.status(401).send("logout_Error: "+err.message);
 }
}

module.exports = { register,adminRegister,login,logout};
