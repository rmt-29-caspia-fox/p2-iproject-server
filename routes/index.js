const express = require("express");
const Controller = require("../controllers");
const router = express.Router();

router.post("/register",Controller.register);
// router.post("/login",Controller.login);

router.post("/gsearch",Controller.gSearch);

router.post("/google-sign-in", Controller.googleLogin);
// router.post("/google-access-api", Controller.gApiAccess);
router.post("/consent-page", Controller.constentPage);
router.post("/oauth2callback", Controller);

module.exports = router;