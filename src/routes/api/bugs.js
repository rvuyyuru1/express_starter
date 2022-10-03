const express = require('express');
const router = express.Router();
const bugModule = require('../../modules/bug/bugController');

router.get('/', bugModule.GetErrors);
router.get('/grby', bugModule.GetErrorsGroupBy);
router.delete('/all', bugModule.DeleteAll);
router.delete('/:id', bugModule.DeleteError);

module.exports = router;
