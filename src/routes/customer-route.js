const express = require("express");
const customerController = require("../controllers/customer-controller");
const router = express.Router();

router.post("/createcustomer", customerController.createcustomer);
router.get("/", customerController.customer);

module.exports = router;
