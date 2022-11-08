const CustomerController = require("../controllers/customerController");
const router = require("express").Router();

router.post("/register", CustomerController.register);
router.post("/login", CustomerController.login);
router.post("/google-login", CustomerController.googleLogin);

module.exports = router;
