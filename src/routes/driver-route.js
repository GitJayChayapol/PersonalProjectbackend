const express = require("express");
const driverController = require("../controllers/driver-controller");
const router = express.Router();

router.post("/createdriver", driverController.createdriver);
router.get("/", driverController.driver);
router.get("/:id", driverController.getdriverById);

module.exports = router;
