const express = require('express');
const problemrouter = express.Router();
const {problemCreate,problemOne,problemDelete,problemUpdate,Allproblem,solveProblem} = require('../controllers/problemController');
const adminMiddle = require('../middleware/adminMiddleware');

//create
problemrouter.post("/create",adminMiddle,problemCreate);

//problem fetch
problemrouter.get("/:id",problemOne);
problemrouter.get("/",Allproblem);

//update
problemrouter.patch("/:id",problemUpdate);

//delete
problemrouter.delete("/:id",problemDelete);

//user solveProblem
problemrouter.get("/user",solveProblem);

module.exports = problemrouter;