const express = require("express");
const customerController = require("../controllers/customer-controller");
const router = express.Router();

router.post("/createcustomer", customerController.createCustomer);
router.get("/", customerController.customer);
router.get("/:customerCall", customerController.getCustomerById);
router.put("/update/:id", customerController.editCustomer);
router.delete("/delete/:id", customerController.deleteCustomer);

module.exports = router;
