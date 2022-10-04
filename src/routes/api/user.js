const express = require('express');
const bruteforce = require('../../helper/bruteforce');
const authMiddleware = require('../../middleware/auth');
const router = express.Router();
const expressJoi = require('express-joi-validation').createValidator({});
const userController = require('../../modules/user/userController');
const loginLogController = require('../../modules/user/loginlogs/loginlogController');
// create user
router.post('/', authMiddleware.retrieveClientInfo, authMiddleware.getClientInfo, expressJoi.body(userController.createUser), userController.addUser);
// login
router.post('/login', bruteforce.prevent, authMiddleware.retrieveClientInfo, authMiddleware.getClientInfo, expressJoi.body(userController.checkUser), userController.getUser);
// update user
router.put('/', expressJoi.body(userController.putUser), userController.updateUser);
//get user details
router.get('/', authMiddleware.authentication, userController.getUserdetails);
// delete user
router.delete('/', authMiddleware.authentication, userController.deleteUser);
router.get('/logout', authMiddleware.authenticationForLogout, loginLogController.loginLogController.logout);
module.exports = router;
