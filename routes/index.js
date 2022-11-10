const express = require("express");
const Controller = require("../controllers");
const { User } = require("../models");
const { compareJwt } = require("../helpers/jwt");
const router = express.Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/gsearch", Controller.gSearch);
router.post("/google-sign-in", Controller.googleLogin);
// router.post("/login",Controller.login);
router.use(async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = compareJwt(access_token);
    if (!payload) {
      throw { name: "InvalidToken" };
    }
    const user = await User.findOne({
      where: { id: payload.id },
    });
    if (!user) {
      throw { name: "InvalidToken" };
    }
    req.user = { id: user.id };
    next();
  } catch (error) {
    next(error);
  }
});

router.post("/favourite", Controller.postFav);
router.get("/favourite",Controller.getFav);
router.put("/favourite/:favId", Controller.editFav);
router.delete("/favourite/:favId", Controller.delFav);
// router.post("/google-access-api", Controller.gApiAccess);
// router.post("/consent-page", Controller.constentPage);
// router.post("/oauth2callback", Controller);

module.exports = router;
