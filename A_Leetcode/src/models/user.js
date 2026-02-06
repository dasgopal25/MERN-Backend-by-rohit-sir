const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

    firstName: {
        type: String,
        minLength: 3,
        maxLength: 20,
        required: true
    },
    
    lastName: {
        type: String,
        minLength:3,
        maxLength:20
    },
    email: {
        type: String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        immutable:true,
    },
    age: {
        type: String,
        min:6,
        max:80,
    },
    role:{
        type:String,
        enum:["user","admin"],
    },
    password: {
        type: String,
        required:true,
    },
    problemID: {
        type: [String],
    },

}, { timestamps: true });

const User =  mongoose.model("user",userSchema);
module.exports = User;