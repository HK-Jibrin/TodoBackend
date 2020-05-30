const express = require("express");
const TodoController = require("../controller/todo.controller");

const router = express.Router();

router.post("/todo", TodoController.addTodo);
router.get("/todos", TodoController.getAllTodos);
// router.patch("/todo/:id", TodoController.updateTodo);
// router.delete("/todo/:id", TodoController.deleteTodo);

module.exports = router;