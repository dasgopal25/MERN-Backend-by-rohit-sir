const problem = require('../models/problem')
const CreateProblemValidation = require('../validator/problemCreateValidator');
const {getLanguageById,submitToken, submitBatch,} = require('../utils/languageID');

const problemCreate = async (req, res) => {
    try {

        const waiting = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

        CreateProblemValidation(req.body);

        const {
            title,
            description,
            difficulty,
            tags,
            visibleTestCases,
            hiddenTestCases,
            startCode,
            referenceSolution
        } = req.body;


        for (const { language, completeCode } of referenceSolution) {

            const languageId = getLanguageById(language);

            if (!languageId) {
                return res.status(400).send("Unsupported Language");
            }

            const submissions = visibleTestCases.map((testcase) => ({
                source_code: completeCode,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output
            }));

           
            const submitResult = await submitBatch(submissions);

            const ResultToken = submitResult.map((value) => value.token);

             await waiting(3000);
             console.log("hello 3");
             
            const testResult = await submitToken(ResultToken);

            
            for (const test of testResult) {
                if (test.status_id !== 3) {
                    return res.status(400).send("Reference Solution Failed");
                }
            }
        }

       
        const userProblem = await problem.create({
            title,
            description,
            difficulty,
            tags,
            visibleTestCases,
            hiddenTestCases,
            startCode,
            referenceSolution,
            problemCreator: req.result._id
        });

        res.status(201).send("Problem Successfully Created");

    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
};


const problemOne = async (req,res)=>{

}
const Allproblem = async (req,res)=>{

}
const problemUpdate = async (req,res)=>{

}
const problemDelete = async (req,res)=>{

}
const solveProblem = async (req,res)=>{

}

module.exports = {problemCreate,problemOne,problemDelete,problemUpdate,Allproblem,solveProblem};

