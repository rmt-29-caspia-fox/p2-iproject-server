const CustomerController = require("../controllers/customerController");
const router = require("express").Router();

router.post("/register", CustomerController.register);
router.post("/login", CustomerController.login);

module.exports = router;
