const express = require('express');
const authMiddleware = require('../../middleware/auth');
const projectController = require('../../modules/projects/projectController');
const expressJoi = require('../../validation/joi');
const router = express.Router();
// create
router.post('/', authMiddleware.authentication, expressJoi.body(projectController.createProjectJOIObject), projectController.createProject);
// update project
router.put('/', authMiddleware.authentication, expressJoi.body(projectController.updateProjectJOIObject), projectController.updateProject);
// get project
router.get('/:project_id', authMiddleware.authentication, projectController.getProject);
// get all projects
router.get('/', authMiddleware.authentication, projectController.getallProject);
// delete project
router.delete('/:project_id', authMiddleware.authentication, projectController.deleteProject);
// delete all projects
router.delete('/', authMiddleware.authentication, projectController.deleteallProject);
module.exports = router;
