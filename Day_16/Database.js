const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb+srv://dasgopal2911:gopal2525%40@foreveranytime.g6yhpup.mongodb.net/BookStore');

}




module.exports = main;



    //   const User = mongoose.model("user",userSchema);

//   const user1 = await new User({name:"Gopal",age:21,city:"Dantan",gender:"Male"});
//   user1.save();

//   await User.create({name:"Sovan",age:20,city:"Barrackpore"});
 
//   await User.insertMany([{name:"Sumana Das",age:18,city:"falta",gender:"Female"},{name:"Sandipan Pal",age:23,gender:"Male"}]);
