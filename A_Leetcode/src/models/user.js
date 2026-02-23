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
        minLength: 3,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        immutable: true,
    },
    age: {
        type: String,
        min: 6,
        max: 80,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
    },
    solvedProblems: {
    type: [{
        type: Schema.Types.ObjectId,
        ref: 'problem',
    }],
    default: [],
},
    password: {
        type: String,
        required: true,
    },

}, { timestamps: true });

userSchema.post("findOneAndDelete",async function(userInfo){

    if(userInfo){
        await mongoose.model('submission').deleteMany({userId:userInfo._id});
    }
});

const User = mongoose.model("user", userSchema);
module.exports = User;