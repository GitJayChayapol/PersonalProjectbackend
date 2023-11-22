const express = require("express");
const driverController = require("../controllers/driver-controller");
const router = express.Router();

router.post("/createdriver", driverController.createDriver);
router.get("/", driverController.driver);
router.get("/:driverFirstName", driverController.getDriverById);
router.put("/update/:id", driverController.editDriver);
router.delete("/delete/:id", driverController.deleteDriver);

module.exports = router;
