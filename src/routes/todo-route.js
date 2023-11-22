const express = require("express");
const todoController = require("../controllers/todo-controller");
const route = express.Router();

route.post("/createtodo", todoController.createtodo);
route.get("/", todoController.todos);
route.get("/invoice", todoController.getinvoice);
route.get("/notinvoice", todoController.notinvoice);
route.get("/:id", todoController.search);
route.put("/update/:id", todoController.editTodo);
route.delete("/delete/:id", todoController.deleteTodo);
route.patch("/status/:id", todoController.updataStatus);

module.exports = route;
