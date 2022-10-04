const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const projectController = {};
const Joi = require('joi');
const Project = require('./projectschema');

projectController.createProjectJOIObject = Joi.object({
  name: Joi.string().required(),
  labelColor: Joi.string().required(),
});
projectController.updateProjectJOIObject = Joi.object({
  name: Joi.string().required(),
  labelColor: Joi.string().required(),
  project_id: Joi.string().required(),
});
// create
projectController.createProject = async (req, res, next) => {
  try {
    let { body, user } = req;
    let project = new Project({
      name: body.name,
      labelColor: body.labelColor,
      user_id: user.id,
    });
    let result = await project.save();
    if (result) otherHelper.sendResponse(res, httpStatus.OK, true, null, null, 'Project created successfully!', null);
    else otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Something went wrong!', null);
  } catch (error) {
    next(error);
  }
};
// update
projectController.updateProject = async (req, res, next) => {
  try {
    let { body, user } = req;
    let result = await Project.findOneAndUpdate(
      {
        user_id: user.id,
        project_id: body.project_id,
      },
      {
        $set: {
          name: body.name,
          labelColor: body.name,
        },
      },
    );
    if (result) otherHelper.sendResponse(res, httpStatus.OK, true, null, null, 'Project updated successfully!', null);
    else otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Something went wrong!', null);
  } catch (error) {
    next(error);
  }
};
// get project
projectController.getProject = async (req, res, next) => {
  try {
    let { params, user } = req;
    let filter = { project_id: params.project_id, user_id: user.id };
    let result = await Project.findOne(filter);
    if (result) otherHelper.sendResponse(res, httpStatus.OK, true, { project: !!result ? [result] : [] }, null, 'Project found successfully!', null);
    else otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Project not found!', null);
  } catch (error) {
    next(error);
  }
};
// get all
projectController.getallProject = async (req, res, next) => {
  try {
    let { user } = req;
    let result = await Project.find().where({ user_id: user.id });
    if (result) otherHelper.sendResponse(res, httpStatus.OK, true, { projects: result }, null, 'Project found successfully!', null);
    else otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Project not found!', null);
  } catch (error) {
    next(error);
  }
};
// delete project
projectController.deleteProject = async (req, res, next) => {
  try {
    let { params, user } = req;
    let result = await Project.findOneAndDelete({
      user_id: user.id,
      project_id: params.project_id,
    });
    console.log(result);
    if (result) otherHelper.sendResponse(res, httpStatus.OK, true, null, null, 'Project deleted successfully!', null);
    else otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Project not found!', null);
  } catch (error) {
    next(error);
  }
};
projectController.deleteallProject = async (req, res, next) => {
  try {
    let { user } = req;
    let filter = { user_id: user.user_id };
    let result = await Project.deleteMany(filter);
    if (result) otherHelper.sendResponse(res, httpStatus.OK, true, null, null, 'Projects deleted successfully!', null);
    else otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Projects not found!', null);
  } catch (error) {
    next(error);
  }
};

module.exports = projectController;
