const express = require("express");
const carController = require("../controllers/car-controller");
const route = express.Router();

route.post("/createcar", carController.createcar);
route.get("/", carController.car);

module.exports = route;
