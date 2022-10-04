const express = require('express');
const router = express.Router();
// // All route come here
router.use('/bug', require('./api/bugs'));
router.use('/user', require('./api/user'));
router.use('/project', require('./api/project'));
router.use('/todo', require('./api/todo'));
module.exports = router;
