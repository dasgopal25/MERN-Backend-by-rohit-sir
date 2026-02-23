const mongoose = require('mongoose');
const { Schema } = mongoose;

const submissionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    
},
    problemId: {
        type: Schema.Types.ObjectId,
        ref: 'problem',
        required: true
   
},
    code: {
        type:String,
        required:true
},
    language: {
        type: String,
        enum:["java","c++","javascript"],
        require: true
},
    status: {
        type:String,
        enum:["pending","wrong","accepted","error"],
        default:"pending"
},
    runtime: {
        type:Number,
        default:0
},
    memory: {
        type:Number,
        default:0
},
    errorMessage: {
       type:String,
       default:'' 
},
    testcasePassed: {
        type:Number,
        default:0
},
    testcasesTotal: {
        type:Number,
        default:0
}

}, { timestamps: true });

submissionSchema.index({userId:1,problemId:1});

const Submission = mongoose.model('submission',submissionSchema);

module.exports = Submission;