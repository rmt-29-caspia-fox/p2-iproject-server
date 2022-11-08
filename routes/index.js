const router = require("express").Router();
const customerRouter = require("./customerRouter");

router.use("/pub", customerRouter);

module.exports = router;
