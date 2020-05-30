const sql = require("../database/db");

module.exports = {
  async addTodo(req, res) {
    try {
      const { item, completed } = req.body;
      const data = {
        item,
        completed,
      };
      const addTodoItem = "INSERT INTO todo SET ?";
      const result = await sql.query(addTodoItem, data);
      if (result) {
        res.status(201).json({
          status: "success",
          message: "Todo added successfully",
          result: result.affectedRows,
        });
      } else {
        res.status(404).json({
          status: "failed",
          message: "Todo not added",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  async getAllTodos(req, res) {
    try {
      const getAll = "SELECT * FROM todo";
      let results = await sql.query(getAll);
      console.log("get all", results);
      return res.status(201).json({
        status: "success",
        message: "View all Todos",
        results: results,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async updateTodo(req, res) {
    try {
      const todoId = req.params.id;
      const { item, completed } = req.body;
      const data = {
        item,
        completed,
      };
      console.log("output data", data);

      const updateQuery = "UPDATE todo SET ? WHERE id = ?";
      const result = await sql.query(updateQuery, [data, todoId]);
      console.log("editted result", result);

      return res.status(201).json({
        status: "success",
        message: "Todo updated successfully",
        result,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async deleteTodo(req, res) {
    try {
      const { id } = req.params;
      const deleteQuery = "DELETE FROM todo WHERE id = ?";
      const result = await sql.query(deleteQuery, id);

      if (result == 0) {
        res.send({
          status: "error",
          message: "No TodoItem",
        });
      } else {
        return res.status(201).json({
          status: "success",
          message: "Todo deleted successfully",
          result,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
}; 