const express = require("express");
const carController = require("../controllers/car-controller");
const route = express.Router();

route.post("/createcar", carController.createcar);
route.get("/", carController.car);
route.get("/:carCall", carController.getcarById);
route.put("/update/:id", carController.editcarById);
route.delete("/delete/:id", carController.deletecar);

module.exports = route;
