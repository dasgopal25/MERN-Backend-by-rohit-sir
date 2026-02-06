const express = require("express");
const router = express.Router();
const { registPost,loginPost,logoutPost,profileGet,userDelete,userUpdate } = require("../controller/user_controller");

router.post("/register", registPost);
router.post("/login",loginPost);
router.post("/logout",logoutPost);

router.get("/profile",profileGet);

router.delete("/delete",userDelete);
router.put("/update",userUpdate);
module.exports = router;
