const CustomerController = require("../controllers/customerController");
const router = require("express").Router();

router.post("/register", CustomerController.register);

module.exports = router;
