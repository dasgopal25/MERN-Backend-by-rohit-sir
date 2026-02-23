const Problem = require("../models/problem");
const Submission = require("../models/submisssion");
const User = require("../models/user");
const { getLanguageById, submitToken, submitBatch, } = require('../utils/languageID');

const submitCode = async (req, res) => {
    try {
        const userId = req.result._id;
        const problemId = req.params.id;
        const { code, language } = req.body;

        if (!language||!code||!problemId||!userId) {
            return res.status(400).send("Unsupported Data field");
        }
        const problem_find = await Problem.findById(problemId);
        //Store some Data
        const submittedResult = await Submission.create({
            userId,
            problemId,
            code,language,
            testcasesTotal: problem_find.hiddenTestCases.length
        });


        //language ID
        const languageId = getLanguageById(language);
        if (!languageId) {
            return res.status(400).send("Unsupported Language");
        }
        const submissions = problem_find.hiddenTestCases.map((testcase) => ({
                source_code: code,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output
            }));
             const submitResult = await submitBatch(submissions);
            
             const ResultToken = submitResult.map((value) => value.token);
             
            const testResult = await submitToken(ResultToken);

            let testcasePassed =0;
            let runtime = 0;
            let memory = 0;
            let errorMessage = null;
            let status = 'accepted';

            for(const test of testResult){
                if( test.status_id == 3){
                    testcasePassed++;
                    runtime+=parseFloat(test.time);
                    memory =Math.max(memory,test.memory);
                }else{
                    if(test.status_id == 4){
                        status ='wrong';
                        errorMessage = test.stderr;
                    }else{
                        status = 'error';
                        errorMessage = test.stderr;
                    }
                }
            }

            //Stored data
            submittedResult.status = status;
            submittedResult.testcasePassed = testcasePassed;
            submittedResult.runtime = runtime;
            submittedResult.memory = memory;
            submittedResult.errorMessage = errorMessage;
            
            await submittedResult.save();

            //Store user Sloved problem Id
            if(!req.result.solvedProblems.includes(problemId)){
                req.result.solvedProblems.push(problemId);
                await req.result.save();
            }

            res.status(201).send("Sumitted successfully");

    } catch (error) {
        res.status(500).send("submit_code Error: " + error.message);
    }
};

const runSubmit = async (req,res)=>{
    try {
        const userId = req.result._id;
        const problemId = req.params.id;
        const { code, language } = req.body;

        if (!language||!code||!problemId||!userId) {
            return res.status(400).send("Unsupported Data field");
        }
        const problem_find = await Problem.findById(problemId);


        //language ID
        const languageId = getLanguageById(language);
        if (!languageId) {
            return res.status(400).send("Unsupported Language");
        }
        const submissions = problem_find.hiddenTestCases.map((testcase) => ({
                source_code: code,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output
            }));
             const submitResult = await submitBatch(submissions);
            
             const ResultToken = submitResult.map((value) => value.token);
             
            const testResult = await submitToken(ResultToken);

            res.status(201).send(testResult[0].status.description);
    } catch (error) {
        return res.status(500).send("run_Submit Error: "+error.message);
    }
}


module.exports = {submitCode,runSubmit};