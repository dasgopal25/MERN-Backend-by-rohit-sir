const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "Male", "female", "Female", "Other"],
    },
    password:{
        type:String,
        require:true
    }
}, { timestamps: true });

const User = mongoose.model("user",userSchema);

module.exports = User;
