const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const todoController = {};
const Joi = require('joi');
const Todo = require('./todoSchema');
todoController.createTodoJOIObject = Joi.object({
  project_id: Joi.string().required(),
  title: Joi.string().required(),
  subtitle: Joi.string(),
  is_done: Joi.boolean(),
  lastDate: Joi.date(),
});
todoController.updateTodoJOIObject = Joi.object({
  todo_id: Joi.string().required(),
  title: Joi.string().required(),
  subtitle: Joi.string(),
  is_done: Joi.boolean(),
  lastDate: Joi.date(),
});
todoController.getallTodoJOIObject = Joi.object({
  project_id: Joi.string().required(),
  title: Joi.string(),
});

todoController.deleteallTodoJOIObject = Joi.object({
  project_id: Joi.string().required(),
});

todoController.createTodo = async (req, res, next) => {
  try {
    let { body } = req;
    let toDo = new Todo({
      is_done: !!body.is_done,
      project_id: body.project_id,
      title: body.title,
      subtitle: !!body.subtitle ? body.subtitle : '',
      lastDate: body.lastDate,
    });
    let result = await toDo.save();
    if (result) otherHelper.sendResponse(res, httpStatus.OK, true, null, null, 'Todo created successfully!', null);
    else otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Something went wrong!', null);
  } catch (error) {
    next(error);
  }
};

todoController.updateTodo = async (req, res, next) => {
  try {
    let { body } = req;
    let result = await Todo.findByIdAndUpdate(
      {
        _id: body.todo_id,
      },
      {
        $set: {
          ...body,
        },
      },
    );
    if (result) otherHelper.sendResponse(res, httpStatus.OK, true, null, null, 'Todo created successfully!', null);
    else otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Something went wrong!', null);
  } catch (error) {
    next(error);
  }
};

// get todo
todoController.getTodo = async (req, res, next) => {
  try {
    let { params } = req;
    let result = await Todo.findById({
      _id: params.todo_id,
    });
    if (result) otherHelper.sendResponse(res, httpStatus.OK, true, result, null, 'Todo obtained successfully!', null);
    else otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Todo not found!', null);
  } catch (error) {
    next(error);
  }
};
// get all todos
todoController.getTodos = async (req, res, next) => {
  try {
    let { query } = req;
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    searchQuery = {
      project_id: query.project_id,
      ...searchQuery,
    };
    if (!!query?.title) {
      searchQuery = {
        project_id: query.project_id,
        title: { $regex: req.query.title, $options: 'i' },
        ...searchQuery,
      };
    }
    let todos = await otherHelper.getQuerySendResponse(Todo, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    console.log(todos);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, todos.data, "Here are the todo's folks!!", page, size, todos.totalData, sortQuery);
  } catch (error) {
    next(error);
  }
};

todoController.deleteTodo = async (req, res, next) => {
  try {
    let { params } = req;
    let result = await Todo.findByIdAndDelete({
      _id: params.todo_id,
    });
    if (result) otherHelper.sendResponse(res, httpStatus.OK, true, null, null, 'Todo deleted successfully!', null);
    else otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Todo not found!', null);
  } catch (error) {
    next(error);
  }
};
todoController.deleteTodos = async (req, res, next) => {
  try {
    let { query } = req;
    let result = await Todo.deleteMany({
      project_id: query.project_id,
    });
    if (result) otherHelper.sendResponse(res, httpStatus.OK, true, null, null, 'Todo deleted successfully!', null);
    else otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Something went wrong!', null);
  } catch (error) {
    next(error);
  }
};

module.exports = todoController;
