const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName:{
        type:String,
        minLength:3,eunm:["male","Male","female","Female","others","Others"],
        maxLength:20,
        required:true,
    },
    lastName:{
        type:String,
        minLength:3,
        maxLength:10,
    },
    age:{
        type:Number,
        min:14,
        max:70,
        required:true
    },
    gender:{
        type:String,
        enum:["male","Male","female","Female","others","Others"],
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    mobile_no:{
        type:BigInt,
        required:true,
        unique:true,
        min:10,
        default:+91,
        trim:true,
        immutable:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    photo:{
        type:String,
        default:"NO found"
    }
},{timestamps:true});


const User = mongoose.model("user",userSchema);

module.exports = User;