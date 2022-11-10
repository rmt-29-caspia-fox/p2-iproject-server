const express = require("express");
const Controller = require("../controllers");
const router = express.Router();

const { authentication } = require("../middlewares");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/discordAuth", Controller.discord);

router.use(authentication);

router.put("/profile/:id", Controller.updateProfile);

module.exports = router;
