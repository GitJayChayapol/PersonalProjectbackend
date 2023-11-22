const express = require("express");
const accountController = require("../controllers/account-controller");
const route = express.Router();

route.post("/createaccount", accountController.createAccount);
route.get("/", accountController.account);
route.delete("/delete/:id", accountController.deleteaccount);
route.get("/:id", accountController.getAccountbyId);

module.exports = route;
