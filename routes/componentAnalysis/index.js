const router = require("express").Router();
const reviews = require("./reviews");
const sales = require("./sales");
const cancellation = require("./cancellation");
const customer = require("./customer");
const operations = require("./operations");
const finance = require("./finance");

router.use("/reviews", reviews);
router.use("/sales", sales);
router.use("/cancellation", cancellation);
router.use("/customer", customer);
router.use("/operations", operations);
router.use("/finance", finance);

module.exports = router;
