const problem = require('../models/problem')
const CreateProblemValidation = require('../validator/problemCreateValidator');
const { getLanguageById, submitToken, submitBatch, } = require('../utils/languageID');
const User = require('../models/user');
const Submission = require('../models/submisssion');

//create
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

//update
const problemUpdate = async (req, res) => {
    try {
    const { id } = req.params;
    if (!id) {
        return res.status(401).send("Missing Update ID");
    }

    const DSA_problem = await problem.findById(id);
    if(!DSA_problem){
        return res.status(401).send("DSA Problem is not exits");
    }

    const {
        title,
        description,
        difficulty,
        tags,
        visibleTestCases,
        hiddenTestCases,
        startCode,
        referenceSolution, problemCreator
    } = req.body;


 const waiting = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        };

    
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

            const testResult = await submitToken(ResultToken);


            for (const test of testResult) {
                if (test.status_id !== 3) {
                    return res.status(400).send("Reference Solution Failed");
                }
            }
        }


        const newProblem = await problem.findByIdAndUpdate(id,{...req.body},{runvalidators:true, returnDocument: 'after' });

        res.status(201).send("Problem Update Successfully");

    } 
    catch (error) {
        res.status(500).send("Error: " + error.message);
    }

}
//delete
const problemDelete = async (req, res) => {
  try {
    const {id} = req.params;
    if(!id)
        return res.status(401).send("ID is Missing");
    
    const deletedProblem = await problem.findByIdAndDelete(id);
    if(!deletedProblem)
        return res.status(401).send("Problem is Missing");

    res.status(200).send("Successfully Deleted");

  } catch (error) {
    res.status(500).send("Error: "+error);
  }
}

//fatch
const problemOne = async (req, res) => {
   try {
    const { id } = req.params;
    if (!id) {
        return res.status(401).send("Missing Update ID");
    }

    const DSA_problem = await problem.findById(id).select('_id title description difficulty tags visibleTestCases startCode referenceSolution ')
    if(!DSA_problem){
        return res.status(401).send("DSA Problem is not exits");
    }
    res.status(201).send(DSA_problem);
  } catch (error) {
    res.status(500).send("get_problem Error: "+error.message)
  }

}
const Allproblem = async (req, res) => {
try {
    const getProblem = await problem.find({}).select('_id title difficulty tags');
    
    if(getProblem.length == 0)
        return res.status(401).send("DSA Problem is not exits");

    res.status(201).send(getProblem);
} 
catch (error) {
    res.status(500).send("All_Problem Error: "+error.message);
}
}

//solved Problem
const solveProblem = async (req, res) => {
 try {
    const userId = req.result._id;
    const user = await User.findById(userId).populate({
        path:'solvedProblems',
        select:"_id title difficulty tags"
    });

    res.status(201).send(user.solvedProblems);
    
 } catch (error) {
    return res.status(500).send("solveProblem Error: "+error.message);
 }
}

//submittedProblem
const submittedProblem = async (req,res)=>{
    try{
        const userId = req.result._id;
        const problemId = req.params.pid;
        const ans = await Submission.find({userId,problemId});
        
        if(ans.length === 0){
        return res.status(200).send("No Submission");
        }
        return res.status(200).send(ans);
    }
    catch(err){
       return res.status(500).send("submitted Problem Error: "+err.message);
    }
    
}

module.exports = { problemCreate, problemOne, problemDelete, 
                  problemUpdate, Allproblem, solveProblem,submittedProblem};

