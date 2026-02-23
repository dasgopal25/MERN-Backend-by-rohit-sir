const express = require('express');
const userMiddle = require('../middleware/userMiddleware');
const {submitCode,runSubmit} = require('../controllers/submitControllers');
const submitRouter = express.Router();


submitRouter.post("/:id",userMiddle,submitCode)
submitRouter.post("/run/:id",userMiddle,runSubmit);

module.exports = submitRouter