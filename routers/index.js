const express = require("express");
const Controller = require("../controllers");
const router = express.Router();

const { authentication } = require("../middlewares");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/register", upload.single("profilePic"), Controller.register);
router.post("/login", Controller.login);
router.post("/discordAuth", Controller.discord);

router.use(authentication);

router.put(
  "/profile/:id",
  upload.single("profilePic"),
  Controller.updateProfile
);

module.exports = router;
