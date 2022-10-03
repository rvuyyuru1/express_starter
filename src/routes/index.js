const express = require('express');
const router = express.Router();

// // All route of bugs
const bugRoutes = require('./api/bugs');
router.use('/bug', bugRoutes);

module.exports = router;
