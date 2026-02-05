const express = require("express");
const router = express.Router();
const { registPost,loginPost,logoutPost,profileGet } = require("../controller/user_controller");

router.post("/register", registPost);
router.post("/login",loginPost);
router.post("/logout",logoutPost);

router.get("/profile",profileGet);

module.exports = router;
