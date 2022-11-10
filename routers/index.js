const express = require("express");
const Controller = require("../controllers");
const router = express.Router();

const { authentication } = require("../middlewares");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/register", upload.single("profilePic"), Controller.register);
router.post("/login", Controller.login);

router.use(authentication);

router.get("/profile/:id", Controller.getProfile);
router.put("/profile/:id", upload.single("profilePic"),Controller.updateProfile);

module.exports = router;
