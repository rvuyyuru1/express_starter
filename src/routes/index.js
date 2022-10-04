const express = require('express');
const router = express.Router();

// // All route of bugs
const bugRoutes = require('./api/bugs');
const userRoutes = require('./api/user');
router.use('/bug', bugRoutes);
router.use('/user', userRoutes);

module.exports = router;
