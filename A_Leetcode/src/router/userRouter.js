const express = require('express');
const Authrouter = express.Router();
const {register,adminRegister,login,logout} = require('../controllers/userAuth'); 
const userMiddle = require('../middleware/userMiddleware');
const adminMiddle = require('../middleware/adminMiddleware');

//register
Authrouter.post('/register',register);
Authrouter.post('/admin/register',adminMiddle,adminRegister);
//login
Authrouter.post('/login',login);
//getProfile
// Authrouter.get('/getProfile',getProfile);
// //logout
Authrouter.post('/logout',userMiddle,logout);

module.exports = Authrouter;