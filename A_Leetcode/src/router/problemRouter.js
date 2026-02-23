const express = require('express');
const problemrouter = express.Router();
const {problemCreate,problemOne,problemDelete,problemUpdate,Allproblem,solveProblem,submittedProblem} = require('../controllers/problemController');
const adminMiddle = require('../middleware/adminMiddleware');
const userMiddle = require('../middleware/userMiddleware');

//create
problemrouter.post("/create",adminMiddle,problemCreate);
//update
problemrouter.put("/update/:id",adminMiddle,problemUpdate);
//delete
problemrouter.delete("/delete/:id",adminMiddle,problemDelete);

//problem fetch
problemrouter.get("/problemById/:id",userMiddle,problemOne);
problemrouter.get("/getAllProblem",userMiddle,Allproblem);

//user submit/:id
problemrouter.get("/submit/:pid",userMiddle,submittedProblem)

//user solveProblem
problemrouter.get("/problemSloveByUser",userMiddle,solveProblem);

module.exports = problemrouter;