const express = require('express');
const authMiddleware = require('../../middleware/auth');
const TodoController = require('../../modules/todos/todoController');
const expressJoi = require('../../validation/joi');
const router = express.Router();
// create
router.post('/', authMiddleware.authentication, expressJoi.body(TodoController.createTodoJOIObject), TodoController.createTodo);
// update
router.put('/', authMiddleware.authentication, expressJoi.body(TodoController.updateTodoJOIObject), TodoController.updateTodo);
// get all
router.get('/', authMiddleware.authentication, TodoController.getTodos);
// get one
router.get('/:todo_id', authMiddleware.authentication, TodoController.getTodo);
// delete all
router.delete('/', authMiddleware.authentication, expressJoi.body(TodoController.deleteallTodoJOIObject), TodoController.deleteTodos);
// delete one
router.delete('/:todo_id', authMiddleware.authentication, TodoController.deleteTodo);
module.exports = router;
