const express = require("express");
const Controller = require("../controllers");
const router = express.Router();

router.post("/register",Controller.register);
// router.post("/login",Controller.login);

router.post("/gsearch",Controller.gSearch);

router.post("/google-sign-in", Controller.googleLogin);

module.exports = router;